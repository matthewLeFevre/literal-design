import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

// import Header from './components/static/Header_comp';
import Nav from './components/static/Nav_comp';
// import Footer from './components/static/Footer_comp';

import Login from './components/static/Login_view';
import SignUp from './components/static/SignUp_view';
import Home from './components/static/Home_view';
import StyleGuidesView from './components/content/StyleGuides_view';
import StyleGuideLiveView from './components/content/StyleGuideLive_view';
// import StyleGuideDetailView from './components/content/StyleGuideDetail_view';
import SectionPublicView from './components/views/public/section_public_view/Section_public_view';

import Dashboard from './components/views/authenticated/dashboard/Dashboard_view';
import ProjectView from './components/views/authenticated/project/Project_view';
import StyleGuideView from './components/views/authenticated/styleGuide/StyleGuide_view';
import SectionView from './components/views/authenticated/section/Section_view';


class App extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onRedirect = this.onRedirect.bind(this);
    this.state = {
      // userData: {
      //   userIsLoggedIn: false,
      // }
      userData: {
        userIsLoggedIn: true,
        apiToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1In0.JeQ53BOvhXpHhsJnS2zOKixkEEm7MnYdiFz_JigYwFA",
        userEmail: "matthewlefevre95@gmail.com",
        userFirstName: null,
        userId: "5",
        userIsOnline: null,
        userJoined: "2018-10-24 16:58:13",
        userLastName: null,
        userName: "matthewlefevre",
        userPassword: "$2y$10$6/9ha1eVzxc4VYf3bx97se1AmLuzmitbThLXT5EovusdBaYV2Cv5m",
        userStatus: "user",
      }
    }
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

  onRedirect(path) {
    // I don't think I will implement this functionality
  }

  render() {
    return (
     <BrowserRouter>
      <div className="app__container">
        <Nav userData={this.state.userData}/>
          <main className="grid">
            <Switch>
  }
              <Route
                path="/login"
                render={(props) => <Login onLogin={this.onLogin} userIsLoggedIn={this.state.userData.userIsLoggedIn}/>} />

              <Route
                path="/signup"
                render={(props) => <SignUp />} />

              <Route
                exact={true}
                path="/dashboard"
                render={(props) =>
                  this.state.userData.userIsLoggedIn
                    ? <Dashboard userData={this.state.userData} />
                    : <Redirect to="/login" />
                }/>

              <Route
                path="/styleguides"
                exact={true}
                render={(props) => <StyleGuidesView {...props} />} />

              <Route
                path="/styleguides/detail/:styleGuideId"
                exact={true}
                render={(props) => <StyleGuideLiveView {...props} />} />

              <Route
                path="/styleguides/detail/:styleGuideId/:sectionId"
                render={(props) => <SectionPublicView {...props} />} />

              <Route
                exact={true}
                path="/dashboard/:projectId"
                render={(props) =>
                  this.state.userData.userIsLoggedIn 
                  ? <ProjectView userData={this.state.userData} {...props} />
                  : <Redirect to="/login" />
                }/>

              <Route
                exact={true}
                path="/dashboard/:projectId/:styleGuideId"
                render={(props) =>
                  this.state.userData.userIsLoggedIn 
                  ? <StyleGuideView userData={this.state.userData} {...props} />
                  : <Redirect to="/login" />
                }/>

              <Route
                exact={true}
                path="/dashboard/:projectId/:styleGuideId/:sectionId"
                render={(props) =>
                  this.state.userData.userIsLoggedIn 
                  ? <SectionView userData={this.state.userData} edit={false} {...props} />
                  : <Redirect to="/login" />
                }/>


              <Route  
                exact={true}
                path="/"
                component={Home} />
              
            </Switch>
          </main>
        {/* <Footer userData={this.state.userData} /> */}
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
