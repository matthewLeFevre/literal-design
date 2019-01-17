import React, { Component } from 'react';
import Globals from '../../../services/Global_service';

import SectionHeader from './SectionHeader_comp';
import SectionNav from './SectionNav_comp';
import ItemSelect from './ItemSelect_comp';

import TextBox from './items/textbox_comp/Textbox_comp';
import Heading from './items/Heading_comp';
import Font from './items/font_comp/Font_comp';
import Image from './items/image_comp/Image_comp';
import Notice from './items/notice_comp/Notice_comp';
import ColorPallet from './items/colorPallet_comp/ColorPallet_comp';
import Code from './items/code_comp/Code_comp';

const Global = new Globals();

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.editSection = this.editSection.bind(this);
    this.cancelEditSection = this.cancelEditSection.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.handleSection = this.handleSection.bind(this);
    this.nextOrder = this.nextOrder.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.state = {
      items: [],
      sectionId: '',
      sectionTitle: '',
      itemOrder: '',
      sectionCreated: '',
      sectionDescription: undefined,
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
      let nextOrder = this.nextOrder(res.data.items);
      this.setState({
        items: res.data.items,
        sectionId: res.data.section[0].sectionId,
        sectionTitle: res.data.section[0].sectionTitle,
        sectionCreated: res.data.section[0].sectionCreated,
        sectionDescription: res.data.section[0].sectionDescription,
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

  componentDidUpdate() {
    if(this.props.match.params.sectionId !== this.state.sectionId) {
      fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
    .then(res => res.json())
    .then(res => {
      let nextOrder = this.nextOrder(res.data.items);
      this.setState({
        items: res.data.items,
        sectionId: res.data.section[0].sectionId,
        sectionTitle: res.data.section[0].sectionTitle,
        sectionCreated: res.data.section[0].sectionCreated,
        sectionDescription: res.data.section[0].sectionDescription,
        itemOrder: res.data.section[0].itemOrder,
        nextOrder: nextOrder,
      });
    });
    }
  }

  /**
   * Toggles Navigation to go 
   * back to styleguides or project
   */
  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  }

  /**
   * Toggles Items Avaliable
   * to be added ot the section
   */
  toggleItem() {
    this.setState((prevState) => ({
      toggleItem: !prevState.toggleItem,
    }));
  }

  /**
   * Calculates the order for the
   * next item that will be added to the 
   * section
   */
  nextOrder (items) {
    let nextOrder = 0;
    let numbers = [];
    if(items.length > 0) {
      for(let item of items) {
        numbers.push(item.itemOrder);
      }
      nextOrder = Math.max(...numbers);
      nextOrder++;
    } else {
      nextOrder = 1;
    }
    return nextOrder;
  }

  /**
   * Untested - 
   * Delets the section selected
   * Not sure what purpose this could have 
   */
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

  /**
   * Handles Changes to the Section
   */
  handleSection(e) {
    let input = e.target.name;
    if(input === "sectionTitle"){
      this.setState({sectionTitle: e.target.value});
    } else {
      this.setState({sectionDescription: e.target.value});
    }
  }

  /**
   * 'Save Section - since the section
   *  was already created
   */
  saveSection() {
    let data = {
      userId: this.props.userData.userId,
      sectionId: this.state.sectionId,
      sectionTitle: this.state.sectionTitle,
      sectionDescription: this.state.sectionDescription,
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

  /**
   * Starts the editing of the 
   * section
   */
  editSection() {
    this.setState({
      edit: true,
    });
  }

  /**
   * Toggles off the section edit
   */
  cancelEditSection() {
    this.setState({
        edit: false,
    });
  }


  
  /**
   * Updates Items
   */
  updateItems(items) {
    let newNextOrder = this.nextOrder(items);
    this.setState((prevState) => ({
      items: items,
      nextOrder: newNextOrder,
      toggleItem: false,
    }));
  }

  render() {
    return(
      <div className="col--12 grid--nested">
        <SectionHeader match={this.props.match} section={this.state} toggleNav={this.toggleNav}/>
        <SectionNav match={this.props.match} sections={this.state.sections} toggleNav={this.toggleNav} toggle={this.state.toggle} section={this.state.section}/>
        <form className="section--edit__view col--12 col--sml--8 dashboard__container">
          { this.state.toggleItem 
            ? <ItemSelect toggleItem={this.toggleItem} 
                updateItems={this.updateItems}
                userData={this.props.userData}
                nextOrder={this.state.nextOrder}
                sectionId={this.state.sectionId}
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
              <textarea className={this.state.edit ? "section--edit__description--field" :  this.state.sectionDescription ? "section--edit__description--field readonly" : "section--edit__description--field readonly empty" } 
                        readOnly={this.state.edit ? false : true} 
                        placeholder="Edit to give this section a description"
                        onChange={this.handleSection}
                        value={this.state.sectionDescription}
                        ></textarea>
            </div>
          </fieldset>

          <fieldset className={`section--edit__fieldset ${this.state.edit ? 'edit' : ''}`}>
              <button type="button"
              className={`btn breath ${this.state.edit ?  'success': 'primary icon'}`} 
              onClick={this.state.edit ? this.saveSection : this.editSection}>
                {this.state.edit ? 'Save Section Info' : <span><i className="fas fa-edit"></i>&nbsp;Edit Section Info</span>}
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
            } else if(item.itemType === "notice") {
              return <Notice notice={item} userData={this.props.userData} updateItems={this.updateItems} key={Global.createRandomKey()}/>;
            } else if(item.itemType === "code"){
              return <Code code={item} userData={this.props.userData} updateItems={this.updateItems} handleAlert={this.props.handleAlert} key={Global.createRandomKey()} />;
            } else {
              return '';
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