import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/static/Header_comp';
import Footer from './components/static/Footer_comp';
import Alert from './components/reusable/Alert_comp';
import Request from './service/reqService';

import Login from './components/static/Login_view';
import SignUp from './components/static/SignUp_view';
import Home from './components/static/Home_view';
import Contact from './components/public/contact/Contact_view';
import AlphaTerms from './components/public/terms_view/AlphaTerms_view';
import AboutView from './components/public/about_view/About_view';
import AlphaView from './components/public/alpha_view/Alpha_view';
import Privacy from './components/public/privacy_view/Privacy_view';
import StyleGuidesView from './components/public/styleguides_search_public_view/StyleGuides_view';
import StyleGuidePublicView from './components/public/styleguide_public_view/StyleGuide_public_view';
import SectionPublicView from './components/public/section_public_view/Section_public_view';

import Dashboard from './components/private/dashboard/Dashboard_view';
import ProjectView from './components/private/project/Project_view';
import StyleGuideView from './components/private/styleGuide/StyleGuide_view';
import SectionView from './components/private/section/Section_view';
import AlphaTools from './components/private/dashboard/AlphaTools_view';

import {AppContext} from './components/context/appContext';
import ProjectSettings from './components/private/dashboard/settings/ProjectSettings';
import StyleGuideSettings from './components/private/dashboard/settings/StyleGuideSettings';

class App extends Component {
  constructor(props) {
    super(props);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateState = this.updateState.bind(this);
    this.setCurrentProject = this.setCurrentProject.bind(this);
    this.setCurrentStyleGuide = this.setCurrentStyleGuide.bind(this);
    this.setCurrentSection = this.setCurrentSection.bind(this);
    this.state = {
      alert: undefined,
      toggles: {
        userSettings: false,
        projectSettings: false,
        styleGuideSettings: false,
        nav: false,
        options: false,
      },
      currentProject: {},
      projects: [],
      currentStyleGuide: {},
      styleGuides: [],
      currentSection: {},
      sections: [],
      // userData: {
      //   userIsLoggedIn: false,
      // }
      userData: {
        userIsLoggedIn: true,
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMyJ9._EN3CoWaLppOtkNEOG6MZYPCuKSvhS8prZvQcXuo8oQ",
        userEmail: "lef13003@byui.edu",
        userId: "13",
        userIsOnline: null,
        userJoined: "2019-01-17 10:09:32",
        userName: "matthew",
        userStatus: "user"
      }
    }
  }
  toggle(e, toggle = null) {
    const toggling = e !== undefined ? e.target.dataset['toggle'] : toggle;
    const newToggles = Object.assign({}, this.state.toggles, { [toggling]:!this.state.toggles[toggling]});
    switch(toggling) {
      case 'projectSettings':
        if(e !== undefined) {
          e.target.dataset.project !== undefined 
            ? this.setState({toggles: newToggles, currentProject:JSON.parse(e.target.dataset['project'])})
            : this.setState({toggles: newToggles});
        } else {
          this.setState({toggles: newToggles});
        };
        break;
      case 'styleGuideSettings':
        if(e !== undefined) {
          e.target.dataset['styleguide'] !== undefined
            ? this.setState({toggles: newToggles, currentStyleGuide: JSON.parse(e.target.dataset['styleguide'])})
            : this.setState({toggles: newToggles});
        } else {
          this.setState({toggles:newToggles});
        };
        break;
      case 'sectionSettings':
        const section = e.target.dataset['section'];
        this.setState({
          toggles: newToggles,
          currentSection: section,
        })
        break;
      default:
        this.setState({toggles: newToggles});
        break;
    }
    
  }
  hideAlert() {this.setState({alert: undefined});}
  handleAlert(message, alertType, closable = true) {

    let alertClasses;

    switch(alertType) {
      case 'success':
        alertClasses = "bg-green txt-white";
      break;
      case 'failure':
        alertClasses = "bg-red txt-white";
      break;
      default:
        alertClasses = "bg-yellow";
      break;
    }

    alertClasses = closable ?  alertClasses + " alert--closeable" : alertClasses + " alert";

    this.setState({
      alert: <Alert hideAlert={this.hideAlert} classes={alertClasses} message={message} />,
      showAlert: true,
    });
  }
  onLogin({userId, userStatus, userName, userEmail, apiToken}, type = 'basic') {
    if(type === 'basic') {
      this.setState({
        userData: {
          userIsLoggedIn: true,
          userId: userId,
          userStatus: userStatus,
          userName: userName,
          userEmail: userEmail,
          apiToken: apiToken
        }
      });
    } else if(type === 'update') {
      this.setState(prevState => ({
        userData: {
          userIsLoggedIn: true,
          userId: userId,
          userStatus: userStatus,
          userName: userName,
          userEmail: userEmail,
          apiToken: prevState.userData.apiToken,
        }
      }));
    }
  }
  onLogout() {
    let data = {
      userId: this.state.userData.userId,
      userIsLoggedIn: "no",
      apiToken: this.state.userData.apiToken,
    }
    let req = Request.createRequestBody("user", "logoutUser", data);
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      this.handleAlert(res.message, res.status);
      this.setState({
        userData: {
          userIsLoggedIn: false,
        }
      });
    });
  }
  updateState(field, data) {
    this.setState({
      [field]: data,
    });
  }
  setCurrentProject(e) {
    this.updateState("currentProject", JSON.parse(e.target.dataset["project"]));
  }
  setCurrentStyleGuide(e) {
    this.updateState("currentStyleGuide", JSON.parse(e.target.dataset["styleguide"]));
  }
  setCurrentSection(e) {
    this.updateState("currentSection", JSON.parse(e.target.dataset["section"]));
  }

  render() {
    return (
     <BrowserRouter>
      <div className="app__container">
        <AppContext.Provider 
          value={{userData: this.state.userData,
                  toggles: this.state.toggles,
                  toggle: this.toggle, 
                  currentProject: this.state.currentProject,
                  projects: this.state.projects,
                  currentStyleGuide: this.state.currentStyleGuide,
                  styleGuides: this.state.styleGuides,
                  currentSection: this.state.currentSection,
                  sections: this.state.sections,
                  onLogout: this.onLogout, 
                  onLogin: this.onLogin,
                  updateState: this.updateState,
                  setCurrentProject: this.setCurrentProject,
                  setCurrentStyleGuide: this.setCurrentStyleGuide,
                  setCurrentSection: this.setCurrentSection,
                  handleAlert: this.handleAlert}}>
          {this.state.toggles.projectSettings ? <ProjectSettings project={this.state.currentProject}/>: ''}
          {this.state.toggles.styleGuideSettings ? <StyleGuideSettings styleGuide={this.state.currentStlyeGuide}/>: ''}
          <Header/>
            <main className="grid">
            {typeof this.state.alert === "object"
            ? this.state.alert 
            : ''}
              <Switch>
    }
                <Route
                  path="/login"
                  render={(props) => <Login onLogin={this.onLogin} 
                                            userIsLoggedIn={this.state.userData.userIsLoggedIn}
                                            handleAlert={this.handleAlert}/>} />

                <Route
                  path="/signup"
                  render={(props) => <SignUp handleAlert={this.handleAlert} />} />

                <Route
                  exact={true}
                  path="/dashboard"
                  render={(props) =>
                    this.state.userData.userIsLoggedIn
                      ? <Dashboard handleAlert={this.handleAlert} 
                                  onLogin={this.onLogin}
                                  onLogout={this.onLogout} {...props}/>
                      : <Redirect to="/login" />
                  }/>

                <Route
                  path="/styleguides"
                  exact={true}
                  render={(props) => <StyleGuidesView {...props} />} />

                <Route
                  path="/styleguides/detail/:styleGuideId"
                  exact={true}
                  render={(props) => <StyleGuidePublicView {...props} />} />

                <Route
                  path="/styleguides/detail/:styleGuideId/:sectionId"
                  render={(props) => <SectionPublicView {...props} />} />

                <Route
                  exact={true}
                  path="/dashboard/:projectId"
                  render={(props) =>
                    this.state.userData.userIsLoggedIn 
                    ? <ProjectView {...props} />
                    : <Redirect to="/login" />
                  }/>

                <Route
                  exact={true}
                  path="/dashboard/:projectId/:styleGuideId"
                  render={(props) =>
                    this.state.userData.userIsLoggedIn 
                    ? <StyleGuideView handleAlert={this.handleAlert} {...props} />
                    : <Redirect to="/login" />
                  }/>

                <Route
                  exact={true}
                  path="/dashboard/:projectId/:styleGuideId/:sectionId"
                  render={(props) =>
                    this.state.userData.userIsLoggedIn 
                    ? <SectionView userData={this.state.userData} edit={false} handleAlert={this.handleAlert} {...props} />
                    : <Redirect to="/login" />
                  }/>

                <Route
                  exact={true}
                  path="/alphatools"
                  render={(props) =>
                    this.state.userData.userIsLoggedIn 
                    ? <AlphaTools {...props} />
                    : <Redirect to="/login" />
                  }/>

                <Route  
                  exact={true}
                  path="/"
                  component={Home} />
                
                <Route  
                  exact={true}
                  path="/about"
                  component={AboutView} />

                <Route  
                  exact={true}
                  path="/alpha"
                  component={AlphaView} />

                <Route  
                  exact={true}
                  path="/privacy"
                  component={Privacy} />

                <Route  
                  exact={true}
                  path="/contact"
                  component={Contact} />

                <Route  
                  exact={true}
                  path="/alphaterms"
                  component={AlphaTerms} />
                
              </Switch>
            </main>
          <Footer userData={this.state.userData} />
        </AppContext.Provider>
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
