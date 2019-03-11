import React from 'react';
import {Link} from 'react-router-dom';
import Utility from '../../../../service/utilService';
import { AppContext } from '../../../context/appContext';

const SectionOptions = props => {
  return (
    <AppContext.Consumer>
      {context => (
        <div>
          <section className="options-item">
            <ul>
              {context.sections.map(section =>(
                <li key={Utility.createRandomKey()}>
                  <Link 
                    data-toggle="options" 
                    onClick={context.toggle} 
                    onClick={context.setCurrentSection}
                    data-section={JSON.stringify(section)}
                    to={`/dashboard/${context.currentProject.projectId}/${context.currentStyleGuide.styleGuideId}/${section.sectionId}`}>
                    {section.sectionTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </AppContext.Consumer>
  );
}

export default SectionOptions;