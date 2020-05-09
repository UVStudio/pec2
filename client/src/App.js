import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import About from './components/layout/About';
import Prologin from './components/auth/Prologin';
import Proregister from './components/auth/Proregister';
import Custlogin from './components/auth/Custlogin';
import Custregister from './components/auth/Custregister';
import CustProfile from './components/profile/CustProfile';
import CurrentCustProfile from './components/profile/CurrentCustProfile';
import UserControl from './components/dashboard/UserControl';
import Dashboard from './components/dashboard/Dashboard';
import CreateProProfile from './components/profile-form/CreateProProfile';
import CreateCustProfile from './components/profile-form/CreateCustProfile';
import EditProProfile from './components/profile-form/EditProProfile';
import CustProProfile from './components/profile-form/EditCustProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import ProProfiles from './components/profiles/ProProfiles';
import ProProfile from './components/profile/ProProfile';
import CurrentProProfile from './components/profile/CurrentProProfile';
import Articles from './components/main/Articles';
import Search from './components/main/Search';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import Routes from '../../client/src/components/routing/Routes';

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
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
