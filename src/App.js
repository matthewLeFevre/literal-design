import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Header from './components/static/Header_comp';
import Footer from './components/static/Footer_comp';

import Login from './components/static/Login_view';
import SignUp from './components/static/SignUp_view';
import Home from './components/static/Home_view';
import StyleGuidesView from './components/content/StyleGuides_view';
import StyleGuideDetailView from './components/content/StyleGuideDetail_view';

import Dashboard from './components/views/authenticated/dashboard/Dashboard_view';
import ProjectView from './components/views/authenticated/project/Project_view';
import StyleGuideView from './components/views/authenticated/styleGuide/StyleGuide_view';
import SectionView from './components/views/authenticated/section/Section_view';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userIsLoggedIn: true,
        userId: "1",
        userStatus: "user",
        userEmail: "test@test.com",
        userName: "matthewLefevre95",
        apiToken: "1234"
      },
    }
  }

  render() {
    return (
     <BrowserRouter>
      <div className="app__container">
        { this.state.userIsLoggedIn ? '' :<Header userData={this.state.userData} userIsLoggedIn={this.state.userIsLoggedIn}/>}
          <main className="grid">
            <Switch>
  }
              <Route
                path="/login"
                render={(props) => <Login />} />

              <Route
                path="/signup"
                render={(props) => <SignUp />} />

              <Route
                exact={true}
                path="/dashboard"
                render={(props) => <Dashboard userData={this.state.userData} />} />

              <Route
                path="/styleguides"
                exact={true}
                render={(props) => <StyleGuidesView {...props} />} />

              <Route
                path="/styleguides/detail/:styleGuideId/:sectionId"
                render={(props) => <StyleGuideDetailView {...props} />} />

              <Route
                exact={true}
                path="/dashboard/:projectId"
                render={(props) => <ProjectView userData={this.state.userData} {...props} />} />

              <Route
                exact={true}
                path="/dashboard/:projectId/:styleGuideId"
                render={(props) => <StyleGuideView userData={this.state.userData} {...props} />} />

              <Route
                exact={true}
                path="/dashboard/:projectId/:styleGuideId/:sectionId"
                render={(props) => <SectionView userData={this.state.userData} edit={false} {...props} />} />


              <Route  
                exact={true}
                path="/"
                component={Home} />
              
            </Switch>
          </main>
        <Footer />
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
