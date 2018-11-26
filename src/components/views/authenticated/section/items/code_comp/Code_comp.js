import React, { Component } from 'react';
import Globals from '../../../../../services/Global_service';
import SyntaxHighlight from '../../../../../services/Syntax_service';

const Global = new Globals();

class Code extends Component {
  constructor(props) {
    super(props);
    this.onInputCode = this.onInputCode.bind(this);
    this.addTab = this.addTab.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.deleteCode = this.deleteCode.bind(this);
    this.highlightCode = this.highlightCode.bind(this);
    this.edit = this.edit.bind(this);
    this.codeEditor = React.createRef();
    this.codeEditorSrc = React.createRef();
    this.state = {
      itemOrder: 0,
      edit: false,
      codeMarkup: '',
      codeLanguage: 'html',
      highlightedMarkup: ''
    }
  }

  componentDidMount() {
    let highlight = this.highlightCode(this.props.code.codeLanguage, 
                                       this.props.code.codeMarkup);
    this.setState({
      codeMarkup: this.props.code.codeMarkup,
      codeLanguage: this.props.code.codeLanguage,
      itemOrder: this.props.code.itemOrder,
      highlightedMarkup: highlight,
    }, () => {
      this.codeEditor.current.innerHTML = this.state.highlightedMarkup;
      this.codeEditorSrc.current.innerHTML = this.state.codeMarkup;
    });
  }

  edit() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }

  onChange(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    }, () => {
      this.codeEditor.current.innerHTML = this.highlightCode(this.state.codeLanguage, this.state.codeMarkup);
    });
  }

  strip(html){
    html = html.replace(/'div'/g, '\n');
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }
  onInputCode() {
    let contents = this.codeEditorSrc.current.innerHTML;
    let language = this.state.codeLanguage;
    let highlight = this.highlightCode(language, contents);

    this.setState({
      codeMarkup: contents,
      highlightedMarkup: highlight,
    }, () => this.codeEditor.current.innerHTML = this.state.highlightedMarkup);
  }

  addTab(e) {
    if(e.keyCode === 9) {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&#009');
    }
  }

  onPaste(e) {
    // cancel paste
    e.preventDefault();
    this.props.handleAlert("Pasting content in a code component is not currently supported", "failure" );
  }

 highlightCode(codeLanguage, codeMarkup) {
    let highlight = '';
    switch(codeLanguage) {
      case 'html':
        highlight = SyntaxHighlight.format_html(codeMarkup);
        break;
      case 'css':
        highlight = SyntaxHighlight.format_css(codeMarkup);
        break;
      case 'js':
        highlight = SyntaxHighlight.format_js(codeMarkup);
        break;
      case 'php':
        highlight = SyntaxHighlight.format_php(codeMarkup);
        break;
      default:
        highlight = '';
        break;
    }
    return highlight;
  }

  updateCode() {

    let codeMarkup = this.state.codeMarkup.replace(/<div>/g, '\n')
                                          .replace(/<br>/g, '')
                                          .replace(/<\/div>/g, '');
    const data = {
      'sectionId': this.props.code.sectionId,
      'codeId': this.props.code.codeId,
      'apiToken': this.props.userData.apiToken,
      'codeLanguage': this.state.codeLanguage,
      'codeMarkup': codeMarkup,
      'itemOrder': this.state.itemOrder,
    }

    const req = Global.createRequestBody('code', 'updateCode', data);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  deleteCode () {
    const data = {
      'sectionId': this.props.code.sectionId,
      'codeId': this.props.code.codeId,
      'apiToken': this.props.userData.apiToken,
    }

    const req = Global.createRequestBody('code', 'deleteCode', data);

    fetch(Global.url, req) 
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
        this.props.handleAlert("Code block deleted successfully", 'success');
      } else {
        this.props.handleAlert(res.msg, 'failure');
      }
    })
  }

  removeFormatting(e) {
    var clearText = e.clipboardData.getData('text/plain');
    document.execCommand('inserttext', false, clearText);
  }

  render() {
    return( <fieldset className="section--edit__fieldset">
    {this.state.edit ? <label className="section--edit__label">Code Block</label> : ''}
    <div className="section--edit__group">

      <div className="section--edit__nav">
          <div className="section--edit__nav--btn grab">
            <i className="fas fa-th txt-blue"></i>
          </div>
          {this.state.edit 
            ? <div className="section--edit__nav--btn" onClick={this.edit}>
                <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
              </div>
            : ''}
          {this.state.edit ? ''
            : <div className="section--edit__nav--btn" onClick={this.edit}>
                <span title="Edit Code"><i className="fas fa-edit txt-green"></i></span>
              </div>}
        </div>
        
        <div className="code--edit__fieldset">
        <label className={this.state.edit ? "section--edit__label" : 'display-none'}>Language</label> 
              <select className={this.state.edit ? "notice-edit__select" : "display-none"}
                      name="codeLanguage"
                      onChange={this.onChange}>
                <option value={this.state.codeLanguage}>{this.state.codeLanguage.toUpperCase()}</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JS</option>
                <option value="php">PHP</option>
              </select>
            <label className="section--edit__label">HighLighted Markup</label> 
            <pre className="code-edit__code"><code ref={this.codeEditor} 
                       name={this.state.codeLanguage}></code></pre>
            <label className={this.state.edit ? "section--edit__label" : "display-none"}>Source Code</label>
            <pre className={this.state.edit ? "code-edit__code" : "display-none"}><code suppressContentEditableWarning={true} 
                       contentEditable={true}
                       spellCheck={false}
                       onKeyDown={this.addTab}
                       onPaste={this.onPaste}
                       ref={this.codeEditorSrc} 
                       onInput={this.onInputCode} 
                       name={this.state.codeLanguage}></code></pre>
          </div> 
          { this.state.edit ? 
            <button type="button" className="section--edit__btn" onClick={this.deleteCode}>
              <i className="fas fa-times"></i>
            </button>
            : ''}
      </div>
      { this.state.edit ? <div className="section--edit__fieldset">
        <button type="button" 
          className="btn success breath" 
          onClick={this.updateCode}>Save</button>
      </div> : ''}
    </fieldset>)
  }
}

export default Code;