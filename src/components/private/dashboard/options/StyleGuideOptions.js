import React from 'react';
import { AppContext } from '../../../context/appContext';

const StyleGuideOptions = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <div>
        <section className="options-item">
          <h3 className="options-item__title">{props.styleGuide.stleGuideTitle}</h3>
          <span className="options-item__date">
            <span className="bold">Date Created:</span>{new Date(props.styleGuide.styleGuideCreated).toDateString()}  
          </span>
          <p>{props.styleGuide.styleGuideDescription 
            ? props.styleGuide.styleGuideDescription 
            : ''}
          </p>
          <fieldset className="field txt-center">
            <button type="button"
                    data-styleguide={JSON.stringify(props.styleGuide)}
                    data-toggle="styleGuideSettings"
                    onClick={context.toggle}
                    className="btn breath primary full">Edit StyleGuide</button>
          </fieldset>
        </section>
      </div>
      )}
    </AppContext.Consumer>
  );
}

export default StyleGuideOptions;