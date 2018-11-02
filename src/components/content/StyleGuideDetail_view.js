import React from 'react';
import {Link} from 'react-router-dom';
import Globals from '../services/Global_service';

const Global = new Globals();

class StyleGuideDetailView extends React.Component {
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
      <section className="styleGuide__container col--12">
        <nav className="styleGuide__nav">
          <div className="styleGuide__nav__header">
            <h1 className="styleGuide__title"><Link to={`/styleguides/detail/${this.state.styleGuide.styleGuideId}`}>{this.state.styleGuide.styleGuideTitle}</Link></h1>
            <span className="styleGuide__nav__drop-toggle" onClick={this.toggleNav}>
              <i className="fas fa-bars" />
            </span>
          </div>
          <div className={this.state.sectionNavToggle ? "styleGuide__nav__body open" : "styleGuide__nav__body"}>
            <ul className="styleGuide__nav__section__list">
              {this.state.allSections.map((section) => {
                return(
                  <li className="styleGuide__nav__section" key={Global.createRandomKey()}>
                    <Link to={`/styleguides/detail/${this.state.styleGuide.styleGuideId}/${section.sectionId}`} className="styleGuide__nav__section__link"><i className="styleGuide__nav__section__link__arrow fas fa-chevron-right"/>&nbsp;{section.sectionTitle}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <article className="styleGuide__section__content__container">
          <div className="styleGuide__sectionTitle__container">
            <h2 className="styleGuide__sectionTitle">{this.state.sections.sectionTitle}</h2>
          </div>
          {this.state.items.map((item) =>{
            if(item.itemType === "heading") {
              return <h3 className="styleGuide__sectionHeading" key={Global.createRandomKey()}>{item.headingText}</h3>;
            } else if(item.itemType === "textBox") {
              return <TextBox key={Global.createRandomKey()} item={item} />;
            } else if(item.itemType === "image") {
              return (<div className ="styleGuide__sectionImage__container" key={Global.createRandomKey()}>
                <img className="styleGuide__sectionImage" alt="fill in this with some useful data" src={item.imageUrl}/>
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

export default StyleGuideDetailView;

const ColorPallet = (props) => {
  return (
    <div className="styleGuide__colorPallet">
      <h4>{props.item.colorPalletTitle}</h4>
        <div className="styleGuide__colorGroup">
          {props.item.colorSwatches.map((color) => {
            return (
              <figure key={Global.createRandomKey()} className="styleGuide__colorSwatch">
			          <div className="styleGuide__colorSwatch__fill" style={{backgroundColor: color.colorSwatchHex}}/>
			          <figcaption className="styleGuide__colorSwatch__detail">
				          <span className="styleGuide__colorSwatch__title">{color.colorSwatchTitle}</span>
                  <span className="styleGuide__colorSwatch__hex">HEX: {color.colorSwatchHex}</span>
                  <span className="styleGuide__colorSwatch__var">SCSS: {color.colorSwatchVar}</span>
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