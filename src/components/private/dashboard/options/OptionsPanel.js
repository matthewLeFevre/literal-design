import React from 'react';
import UserOptions from './UserOptions';
import ProjectOptions from './ProjectOptions';
import StyleGuideOptions from './StyleGuideOptions';
import SectionOptions from './SectionOptions';
import { AppContext } from '../../../context/appContext';

const OptionsPanel = (props) => {
  let options;
  switch(props.location.path) {
    case '/dashboard':
      options = <UserOptions {...props}/>
    break;
    case '/dashboard/:projectId':
      options = <ProjectOptions project={props.project} {...props}/>
      break;
    case '/dashboard/:projectId/:styleGuideId':
      options = <StyleGuideOptions {...props}/>;
      break;
    case '/dashboard/:projectId/:styleGuideId/:sectionId':
      options = <SectionOptions {...props}/>
      break;
    default:
      options = <UserOptions />
    break;
  }
  return( 
    <AppContext.Consumer>
      {(context) =>(
         <div className="options col--sml--4 col--mdm--3">
         <header className="options-header">
           <h2 className="options__title" data-toggle="options" onClick={context.toggle}>{props.optionTitle}</h2>
           <span 
             className="options-toggle" 
             data-toggle="options" 
             onClick={context.toggle}>
            <i className="fas fa-bars"></i>
           </span>
         </header>
         <section className={context.toggles.options ? 'options-body open' : 'options-body'}>{options}</section>
       </div>
      )}
    </AppContext.Consumer>
  );
}
export default OptionsPanel;