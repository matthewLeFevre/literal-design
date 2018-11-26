import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/static/Header_comp';
import Footer from './components/static/Footer_comp';
import Alert from './components/reusable/Alert_comp';

import Login from './components/static/Login_view';
import SignUp from './components/static/SignUp_view';
import Home from './components/static/Home_view';
import StyleGuidesView from './components/content/StyleGuides_view';
import StyleGuidePublicView from './components/views/public/styleguide_public_view/StyleGuide_public_view';
import SectionPublicView from './components/views/public/section_public_view/Section_public_view';

import Dashboard from './components/views/authenticated/dashboard/Dashboard_view';
import ProjectView from './components/views/authenticated/project/Project_view';
import StyleGuideView from './components/views/authenticated/styleGuide/StyleGuide_view';
import SectionView from './components/views/authenticated/section/Section_view';


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
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIn0.E8y8YZearD7KOniGuZw_v76DCdYDl6O5J1zCaDDkCks",
        userEmail: "matthewlefevre95@gmail.com",
        userFirstName: null,
        userId: "1",
        userIsOnline: null,
        userJoined: "2018-11-13 21:26:11",
        userLastName: null,
        userName: "matthewlefevre",
        userPassword: "$2y$10$2cDj0TXyAvhtME03jEd9ievDCEKkmQAH36KHi38pb4uG5GKwbEbyy",
        userStatus: "user",
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
    this.setState({
      userData: {
        userIsLoggedIn: false,
      }
    });
    this.handleAlert("Logged out successful", "success");
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
                    ? <Dashboard userData={this.state.userData} handleAlert={this.handleAlert} />
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
                path="/"
                component={Home} />
              
            </Switch>
          </main>
        <Footer userData={this.state.userData} />
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
