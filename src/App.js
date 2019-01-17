import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/static/Header_comp';
import Footer from './components/static/Footer_comp';
import Alert from './components/reusable/Alert_comp';
import Globals from './components/services/Global_service';

import Login from './components/static/Login_view';
import SignUp from './components/static/SignUp_view';
import Home from './components/static/Home_view';
import Contact from './components/views/public/contact/Contact_view';
import AlphaTerms from './components/views/public/terms_view/AlphaTerms_view';
import AboutView from './components/views/public/about_view/About_view';
import AlphaView from './components/views/public/alpha_view/Alpha_view';
import Privacy from './components/views/public/privacy_view/Privacy_view';
import StyleGuidesView from './components/content/StyleGuides_view';
import StyleGuidePublicView from './components/views/public/styleguide_public_view/StyleGuide_public_view';
import SectionPublicView from './components/views/public/section_public_view/Section_public_view';

import Dashboard from './components/views/authenticated/dashboard/Dashboard_view';
import ProjectView from './components/views/authenticated/project/Project_view';
import StyleGuideView from './components/views/authenticated/styleGuide/StyleGuide_view';
import SectionView from './components/views/authenticated/section/Section_view';
import AlphaTools from './components/views/authenticated/dashboard/AlphaTools_view';

const Global = new Globals();

class App extends Component {
  constructor(props) {
    super(props);
    this.hideAlert = this.hideAlert.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
    this.state = {
      alert: '',
      showAlert: false,
      // userData: {
      //   userIsLoggedIn: false,
      // }
      userData: {
        userIsLoggedIn: true,
        userName:"matthewrlefevre",
        userJoined:"2018-12-28 21:37:09",
        userStatus:"user",
        userId: 12,
        userEmail:"matthewrlefevre@test.com"
      }
    }
  }

  hideAlert() {this.setState({showAlert: false,});}

  handleAlert(message, alertType, closable = true) {
    let alertClasses;

    if(alertType === 'success') {
      alertClasses = "bg-green txt-white";
    } else if(alertType ==='failure'){
      alertClasses = "bg-red txt-white";
    } else {
      alertClasses = "bg-yellow";
    }

    if(closable) {
      alertClasses = alertClasses + " alert--closeable";
    } else {
      alertClasses = alertClasses + " alert";
    }

    this.setState({
      alert: <Alert hideAlert={this.hideAlert} classes={alertClasses} message={message} />,
      showAlert: true,
    });
  }

  onLogin(data) {
    this.setState({
      userData: {
        userIsLoggedIn: true,
        userId: data.userId,
        userStatus: data.userStatus,
        userName: data.userName,
        userEmail: data.userEmail,
        apiToken: data.apiToken
      }
    });
  }

  onLogout() {
    let data = {
      userId: this.state.userData.userId,
      userIsLoggedIn: "no",
      apiToken: this.state.userData.apiToken,
    }
    let req = Global.createRequestBody("user", "logoutUser", data);
    fetch(Global.url, req)
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

  onRedirect(path) {
    // I don't think I will implement this functionality
  }

  render() {
    return (
     <BrowserRouter>
      <div className="app__container">
        <Header userData={this.state.userData} onLogout={this.onLogout}/>
        {/* <Nav userData={this.state.userData} hide="hide--sml"/> */}
          <main className="grid">
          {this.state.showAlert 
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
                    ? <Dashboard userData={this.state.userData} handleAlert={this.handleAlert} onLogout={this.onLogout}/>
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
                  ? <ProjectView userData={this.state.userData} handleAlert={this.handleAlert} {...props} />
                  : <Redirect to="/login" />
                }/>

              <Route
                exact={true}
                path="/dashboard/:projectId/:styleGuideId"
                render={(props) =>
                  this.state.userData.userIsLoggedIn 
                  ? <StyleGuideView userData={this.state.userData} handleAlert={this.handleAlert} {...props} />
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
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
