import React from 'react';
import Globals from '../../../services/Global_service';
import SectionPublicNav from './Section_public_nav';

const Global = new Globals();

class SectionPublicView extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      sections: [],
      allSections: [],
      items: [],
      styleGuide: {},
      sectionNavToggle: false,
    }
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
    .then( res => res.json())
    .then( res => {
      this.setState({
        sections: res.data.section[0],
        allSections: res.data.section,
        items: res.data.items,
      });
    });

    fetch(`${Global.url}?controller=styleGuide&action=getStyleGuideById&styleGuideId=${this.props.match.params.styleGuideId}`)
    .then( res => res.json())
    .then( res => {
      console.log(res.data);
      this.setState({
        allSections: res.data[1],
        styleGuide: res.data[0][0],
      });
    });
  }

  componentDidUpdate() {
    if(this.props.match.params.sectionId !== this.state.sections.sectionId) {
      fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
      .then( res => res.json())
      .then( res => {
        this.setState({
          sections: res.data.section[0],
          items: res.data.items,
        });
      });

      fetch(`${Global.url}?controller=styleGuide&action=getStyleGuideById&styleGuideId=${this.props.match.params.styleGuideId}`)
      .then( res => res.json())
      .then( res => {
        this.setState({
          allSections: res.data[1],
          styleGuide: res.data[0][0],
        });
      });
    }
  }

  toggleNav() {
    this.setState( (prevState) => ({
      sectionNavToggle: !prevState.sectionNavToggle,
    }));
  }

  render() {
    return (
      <section className="section--public__container col--12">

        <SectionPublicNav 
          sectionNavToggle={this.state.sectionNavToggle}
          toggleNav={this.toggleNav}
          styleGuideTitle={this.state.styleGuide.styleGuideTitle}
          allSections={this.state.allSections} 
          match={this.props.match}/>

        <article className="section--public__content">
          <div className="section--public__title-container">
            <h2>{this.state.sections.sectionTitle}</h2>
          </div>
          {this.state.items.map((item) =>{
            if(item.itemType === "heading") {
              return <h3 className="section--public__heading" key={Global.createRandomKey()}>{item.headingText}</h3>;
            } else if(item.itemType === "textBox") {
              return <TextBox key={Global.createRandomKey()} item={item} />;
            } else if(item.itemType === "image") {
              return (<div className ="section--public__img-container" key={Global.createRandomKey()}>
                <img className="section--public__img" alt="fill in this with some useful data" src={item.imageUrl}/>
              </div>);
            } else if(item.itemType === "colorPallet") {
              return <ColorPallet item={item}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "font") {
              let fontStyle = item.fontValue;
              return (
                <div key={Global.createRandomKey()}>
                  <link href={item.fontUrl} rel="stylesheet"/>
                  <h2 style={{fontFamily: fontStyle}}>Lorem ipsum dolor sit amet</h2>
                </div>
              );
            } else {
              return '';
            }
          })}
        </article>
      </section>
    );
  }
}

export default SectionPublicView;

const ColorPallet = (props) => {
  return (
    <div className="section--public__colorPallet">
      <h4>{props.item.colorPalletTitle}</h4>
        <div className="section--public__colorGroup">
          {props.item.colorSwatches.map((color) => {
            return (
              <figure key={Global.createRandomKey()} className="section--public__colorSwatch">
			          <div className="section--public__colorSwatch-fill" style={{backgroundColor: color.colorSwatchHex}}/>
			          <figcaption className="seciton--public__colorSwatch-detail">
				          <span className="section--public__colorSwatch-title">{color.colorSwatchTitle}</span>
                  <span className="section--public__colorSwatch-hex">HEX: {color.colorSwatchHex}</span>
                  <span className="section--public__colorSwatch-var">SCSS: {color.colorSwatchVar}</span>
			          </figcaption>
		          </figure>
            );
          })}
        </div>
    </div>
  );
}

class TextBox extends React.Component {
  constructor(props) {
    super(props);
    this.textBox = React.createRef();
  }
  componentDidMount() {
    this.textBox.current.innerHTML = Global.htmlDecode(this.props.item.textBoxText);
  }
  render() {
    return(
      <div className="styleGuide__sectionTextBox" ref={this.textBox}></div>
    );
  }
}