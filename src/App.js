import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/Header_comp';
import Footer from './components/Footer_comp';
import Settings from './components/Settings_comp';

import Login from './views/Login_view';
import SignUp from './views/SignUp_view';
import Home from './views/Home_view';
import About from './views/About_view';

import Dashboard from './views/authenticated/Dashboard_view';
import ProjectView from './views/authenticated/Project_view';
import StyleGuideView from './views/authenticated/StyleGuide_view';
import SectionView from './views/authenticated/Section_view';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoggedIn: true,
      userData: {
        userId: "1",
        userStatus: "user",
        userEmail: "test@test.com",
        userName: "test",
        apiToken: "1234"
      }
    }
  }
  render() {
    return (
     <BrowserRouter>
      <div className="app__container">
        <Header />
          <main className="grid">
            <Switch>
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

              {/* <Route
                path="/blog"
                render={(props) => <Blog />} /> */}

              <Route
                exact={true}
                path="/dashboard/:projectTitle"
                render={(props) => <ProjectView userData={this.state.userData} {...props} />} />

              {/* <Route
                path="/dashboard/:projectTitle/settings"
                render={(props) => <Settings {...props} />} /> */}

              <Route
                exact={true}
                path="/dashboard/:projectTitle/:styleGuideTitle"
                render={(props) => <StyleGuideView userData={this.state.userData} {...props} />} />

              {/* <Route
                path="/dashboard/:projectTitle/:styleGuideTitle/settings"
                render={(props) => <Settings {...props} />} /> */}

              <Route
                exact={true}
                path="/dashboard/:projectTitle/:styleGuideTitle/:sectionTitle"
                render={(props) => <SectionView userData={this.state.userData} edit={false} {...props} />} />

              <Route
                exact={true}
                path="/dashboard/:projectTitle/:styleGuideTitle/:sectionTitle/edit"
                render={(props) => <SectionView userData={this.state.userData} edit={true} {...props} />} />

              {/* <Route
                path="/dashboard/:projectTitle/:styleGuideTitle/:sectionTitle/settings"
                render={(props) => <Settings {...props} />} /> */}

              {/* <Route
                path=""
                render={(props) => <Component />} /> */}

              <Route  
                exact={true}
                path="/"
                component={Home} />
              
              <Route  
                path="/about"
                component={About} />
              
              {/* <Route  
                path="/contact"
                component={Contact} />

              <Route  
                path="/pricing"
                component={Pricing} />

              <Route  
                path="/termsOfService"
                component={Home} />

              <Route  
                path="/termsandConditions"
                component={Home} />

              <Route  
                path="/privacypolicy"
                component={Home} />

              <Route  
                path="/documentation"
                component={Home} /> */}

              {/* <Route  
                path=""
                component={Page404} /> */}
              
            </Switch>
          </main>
        <Footer />
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
