import React, { Component } from 'react';
import Globals from '../../../services/Global_service';

import SectionHeader from './SectionHeader_comp';
import SectionNav from './SectionNav_comp';
import ItemSelect from './ItemSelect_comp';

import TextBox from './items/Textbox_comp';
import Heading from './items/Heading_comp';
import Font from './items/Font_comp';
import Image from './items/Image_comp';
import ColorPallet from './items/ColorPallet_comp';

const Global = new Globals();

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.closeItem = this.closeItem.bind(this);
    this.editSection = this.editSection.bind(this);
    this.cancelEditSection = this.cancelEditSection.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.handleSection = this.handleSection.bind(this);
    this.nextOrder = this.nextOrder.bind(this);
    this.createTextBox = this.createTextBox.bind(this);
    this.createHeading = this.createHeading.bind(this);
    this.createColorPallet = this.createColorPallet.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.state = {
      items: [],
      sectionId: '',
      sectionTitle: '',
      itemOrder: '',
      sectionCreated: '',
      sectionDescription: '',
      edit: false,
      sections: [],
      save: false,
      toggle: false,
      toggleItem: false,
      nextOrder: 0,
    }
  }

  componentDidMount() {
    // grabs the indivudual section
    fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
    .then(res => res.json())
    .then(res => {
      console.log(res.data.items);
      let nextOrder = this.nextOrder(res.data.items);
      this.setState({
        items: res.data.items,
        sectionId: res.data.section[0].sectionId,
        sectionTitle: res.data.section[0].sectionTitle,
        sectionCreated: res.data.section[0].sectionCreated,
        sectionDescription: 'section descriptions are not yet implimented',
        itemOrder: res.data.section[0].itemOrder,
        nextOrder: nextOrder,
      });
    });

    // Grabs all other sections
    fetch(`${Global.url}?controller=section&action=getSectionsByStyleGuideId&styleGuideId=${this.props.match.params.styleGuideId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        sections: res.data,
      });
    });
  }

  componentWillReceiveProps() {

  }

  
  
  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }

  toggleItem() {
    console.log('clicked');
    this.setState((prevState) => ({
      toggleItem: !prevState.toggle,
    }))
  }

  closeItem () {
    this.setState({
      toggleItem: false,
    })
  }

  nextOrder (items) {
    
    let nextOrder = 0;
    for(let item of items) {
      if(item.itemOrder > nextOrder) {
        console.log(item);
        console.log(item.itemType);
        nextOrder = item.itemOrder;
      }
    }
    nextOrder++;
    console.log(nextOrder);
    return nextOrder;
  }

  deleteSection(e) {
    let data = {'sectionId': e.target.value, 
                'styleGuideId': this.state.styleGuide.styleGuideId, 
                'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('section', 'deleteSection', data);
    let req = Global.createRequest(body);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          sections: res.data,
        });
      }
    })
  }

  handleSection(e) {
    let input = e.target.name;
    if(input === "sectionTitle"){
      this.setState({sectionTitle: e.target.value});
    } else {
      this.setState({section: {sectionDescription: e.target.value}});
    }
  }

  saveSection() {
    let data = {
      userId: this.props.userData.userId,
      sectionId: this.state.sectionId,
      sectionTitle: this.state.sectionTitle,
      apiToken: this.props.userData.apiToken,
      itemOrder: this.state.itemOrder,
    }
    let req = Global.createRequestBody('section', 'updateSection', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          section: res.data,
          edit: false,
        });
        fetch(`${Global.url}?controller=section&action=getSectionsByStyleGuideId&styleGuideId=${this.props.match.params.styleGuideId}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            sections: res.data,
          });
        });
      }
    }); 
  }

  editSection() {
    console.log(this.state);
    this.setState({
      edit: true,
  });
  }

  cancelEditSection() {
    this.setState({
        edit: false,
    });
  }

  createTextBox() {
    let data = {
      'sectionId': this.state.sectionId,
      'textBoxText': "...",
      'itemOrder': this.state.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('textBox', 'createTextBox', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let nextOrder = this.nextOrder(res.data);
      if(res.status === 'success') {
        this.setState({
          items: res.data,
          toggleItem: false,
          nextOrder: nextOrder,
        });
      }
    })
  }

  createHeading() {
    let data = {
      'sectionId': this.state.sectionId,
      'headingText': '...',
      'itemOrder': this.state.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('heading', 'createHeading', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let nextOrder = this.nextOrder(res.data);
      if(res.status === 'success') {
        this.setState({
          items: res.data,
          toggleItem: false,
          nextOrder: nextOrder,
        });
      }
    })
  }

  createColorPallet() {
    let data = {
      'sectionId': this.state.sectionId,
      'itemOrder': this.state.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('colorPallet', 'createColorPallet', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let nextOrder = this.nextOrder(res.data);
      if(res.status === 'success') {
        this.setState({
          items: res.data,
          toggleItem: false,
          nextOrder: nextOrder,
        });
      }
    })
  }
  
  updateItems(items) {
    this.setState({
      items: items,
    })
  }

  render() {
    console.log(this.props);
    return(
      <div className="col--12 grid--nested">
        <SectionHeader match={this.props.match} section={this.state} toggleNav={this.toggleNav}/>
        <SectionNav match={this.props.match} sections={this.state.sections} toggleNav={this.toggleNav} toggle={this.state.toggle} section={this.state.section}/>
        <form className="section--edit__view col--12 col--sml--8">
          { this.state.toggleItem 
            ? <ItemSelect closeItem={this.closeItem} 
                createTextBox={this.createTextBox}
                createHeading={this.createHeading}
                createColorPallet={this.createColorPallet}
                /> 
            : ''}
          <fieldset className="section--edit__fieldset">
            {this.state.edit ? <label className="section--edit__label">Section Title</label> : ''}
            <div className="section--edit__group">
              <input className={this.state.edit ? "section--edit__heading--field" : "section--edit__heading--field readonly"}
                      readOnly={this.state.edit ? false : true} 
                      onChange={this.handleSection}
                      name='sectionTitle'
                      defaultValue={this.state.sectionTitle}/>
            </div>
          </fieldset>
          <fieldset className="section--edit__fieldset">
            {this.state.edit ? <label className="section--edit__label">Section Description</label> : ''}
            <div className="section--edit__group">
              <textarea className={this.state.edit ? "section--edit__description--field" : "section--edit__description--field readonly"} 
                        readOnly={this.state.edit ? false : true} 
                        placeholder="Edit to give this section a description"
                        onChange={this.handleSection}
                        defaultValue={this.state.sectionDescription}
                        ></textarea>
            </div>
          </fieldset>

          <fieldset className={`section--edit__fieldset ${this.state.edit ? 'edit' : ''}`}>
              <button type="button"
              className={`btn breath ${this.state.edit ?  'success': 'primary icon'}`} 
              onClick={this.state.edit ? this.saveSection : this.editSection}>
                {this.state.edit ? 'Save Section Info' : <span><i className="fas fa-edit"></i>&nbsp;Edit</span>}
              </button>
              {this.state.edit ? 
                <button type="button"
                className='btn breath danger'
                onClick={this.cancelEditSection}>
                  Cancel
                </button>
              :''}
              
          </fieldset>

          { this.state.items.map((item) => {
            if(item.itemType === "heading") {
              return <Heading heading={item} userData={this.props.userData} updateItems={this.updateItems}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "textBox") {
              return <TextBox textBox={item} userData={this.props.userData} updateItems={this.updateItems}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "image") {
              return (<Image image={item} userData={this.props.userData} updateItems={this.updateItems}  key={Global.createRandomKey()}/>);
            } else if(item.itemType === "font") {
              return <Font font={item} userData={this.props.userData} updateItems={this.updateItems}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "colorPallet") {
              return <ColorPallet colorPallet={item} userData={this.props.userData} updateItems={this.updateItems}  key={Global.createRandomKey()}/>;
            }
          })
          
        }
          <button type="button" className="btn adder initial" onClick={this.toggleItem}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default SectionView;