import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';

class StyleGuideDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [
        { sectionTitle: "Introduction", 
          itemOrder: "1", 
          items: [
            {type: "textBox",
              textBoxText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              itemOrder: "1",
            },
            {type: "image",
              imageUrl: "https://images.unsplash.com/photo-1538218952949-2f5dda4a9156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b79a9c7314dd5ca8eac2f187902ceca2&auto=format&fit=crop&w=1952&q=80",
              itemOrder: "2"
            },
            {type: "heading",
              headingText: "How to Contribute",
              itemOrder: "3",
            },
            {type: "textBox",
              textBoxText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              itemOrder: "4",
            },
            {type: "image",
              imageUrl: "https://images.unsplash.com/photo-1538218952949-2f5dda4a9156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b79a9c7314dd5ca8eac2f187902ceca2&auto=format&fit=crop&w=1952&q=80",
              itemOrder: "2"
            },
            {type: "heading",
              headingText: "How to Contribute",
              itemOrder: "3",
            },
            {type: "textBox",
              textBoxText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              itemOrder: "4",
            },
            {type: "image",
              imageUrl: "https://images.unsplash.com/photo-1538218952949-2f5dda4a9156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b79a9c7314dd5ca8eac2f187902ceca2&auto=format&fit=crop&w=1952&q=80",
              itemOrder: "2"
            },
            {type: "heading",
              headingText: "How to Contribute",
              itemOrder: "3",
            },
            {type: "textBox",
              textBoxText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              itemOrder: "4",
            },
          {type: "heading",
            headingText: "Brand Colors",
            itemOrder: "1",
          },
          {type: "textBox",
            textBoxText: "Brand colors are hugely important that is why we have selected the following colors very carefully. Use only the colors listed below and out of those colors use primarily the main brand colors."
          },
          {type: "colorPallet",
            colorPalletTitle: "Brand Colors",
            colorGroups: [
              {itemOrder: '1',
                colorSwatches: [
                  {itemOrder: '1', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '2', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '3', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '3', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '3', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '3', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                ]
              },
              {itemOrder: '1',
                colorSwatches: [
                  {itemOrder: '1', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '2', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"},
                  {itemOrder: '3', colorSwatchHex: '#735CDD', colorSwatchRGB: 'rgb(115, 92, 221)', colorSwatchTitle: 'Purple', colorSwatchVar: "$color"}
                ]
              }
            ]
          }, 
          {type: "font",
          fontUrl: "https://fonts.googleapis.com/css?family=Srisakdi",
          fontValue: `'Srisakdi', cursive`,
          itemOrder: "6",
          }
        ]},
      { sectionTitle: "Typography Guide", itemOrder:"2"},
      { sectionTitle: "Image Guide", itemOrder:"2"},
      ],
      styleGuide: {
        styleGuideTitle: "Blue Rim Guide",
        styleGuideDescription: "lorem Ipsum Dolor sit amet",
      }
    }
  }
  render() {
    return (
      <section className="styleGuide__container col--12">
        <nav className="styleGuide__nav">
          <div className="styleGuide__nav__header">
            <h1 className="styleGuide__title">{this.state.styleGuide.styleGuideTitle}</h1>
            <span className="styleGuide__nav__drop-toggle">
              <i className="fas fa-bars" />
            </span>
          </div>
          <div className="styleGuide__nav__body open">
            <ul className="styleGuide__nav__section__list">
              {this.state.sections.map((section) => {
                return(
                  <li className="styleGuide__nav__section">
                    <Link to="#" className="styleGuide__nav__section__link"><i className="styleGuide__nav__section__link__arrow fas fa-chevron-right"/>&nbsp;{section.sectionTitle}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <article className="styleGuide__section__content__container">
          <div className="styleGuide__sectionTitle__container">
            <h2 className="styleGuide__sectionTitle">{this.state.sections[0].sectionTitle}</h2>
          </div>
          {this.state.sections[0].items.map((item) =>{
            if(item.type === "heading") {
              return <h3 className="styleGuide__sectionHeading">{item.headingText}</h3>;
            } else if(item.type === "textBox") {
              return <div className="styleGuide__sectionTextBox">{item.textBoxText}</div>;
            } else if(item.type === "image") {
              return (<div className ="styleGuide__sectionImage__container">
                <img className="styleGuide__sectionImage" alt="fill in this with some useful data" src={item.imageUrl}/>
              </div>);
            } else if(item.type === "colorPallet") {
              return <ColorPallet item={item} />;
            } else if(item.type === "font") {
              let fontStyle = item.fontValue;
              return (
                <div>
                  <link href={item.fontUrl} rel="stylesheet"/>
                  <h2 style={{fontFamily: fontStyle}}>Lorem ipsum dolor sit amet</h2>
                </div>
              );
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
      {props.item.colorGroups.map((group) =>{
        return (
        <div className="styleGuide__colorGroup">
          {group.colorSwatches.map((color) => {
            return (
              <figure className="styleGuide__colorSwatch">
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
        );
      })}
    </div>
  );
}