import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Prologin from './components/auth/Prologin';
import Proregister from './components/auth/Proregister';
import Proprofile from './components/auth/Proprofile';
import Custlogin from './components/auth/Custlogin';
import Custregister from './components/auth/Custregister';
import Custprofile from './components/auth/Custprofile';
import UserControl from './components/dashboard/UserControl';
import Dashboard from './components/dashboard/Dashboard';
import CreateProProfile from './components/profile-form/CreateProProfile';
import CreateCustProfile from './components/profile-form/CreateCustProfile';
import EditProProfile from './components/profile-form/EditProProfile';
import CustProProfile from './components/profile-form/EditCustProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import ProProfiles from './components/profiles/ProProfiles';
import About from './components/main/About';
import Articles from './components/main/Articles';
import Search from './components/main/Search';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //look up hooks useEffect(), this would be a lot like componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/pro-login" component={Prologin} />
              <Route exact path="/pro-register" component={Proregister} />
              <Route exact path="/pro-profile" component={Proprofile} />
              <Route exact path="/pro-profiles" component={ProProfiles} />
              <Route exact path="/cust-login" component={Custlogin} />
              <Route exact path="/cust-register" component={Custregister} />
              <Route exact path="/cust-profile" component={Custprofile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-pro-profile"
                component={CreateProProfile}
              />
              <PrivateRoute
                exact
                path="/create-cust-profile"
                component={CreateCustProfile}
              />
              <PrivateRoute
                exact
                path="/user-control"
                component={UserControl}
              />
              <PrivateRoute
                exact
                path="/edit-proprofile"
                component={EditProProfile}
              />
              <PrivateRoute
                exact
                path="/edit-custprofile"
                component={CustProProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/articles" component={Articles} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </section>
        </Fragment>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
