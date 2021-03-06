import React from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import About from '../../components/layout/About';
import Prologin from '../../components/auth/Prologin';
import Proregister from '../../components/auth/Proregister';
import Custlogin from '../../components/auth/Custlogin';
import Custregister from '../../components/auth/Custregister';
import CustProfile from '../../components/profile/CustProfile';
import CurrentCustProfile from '../../components/profile/CurrentCustProfile';
import UserControl from '../../components/dashboard/UserControl';
import Dashboard from '../../components/dashboard/Dashboard';
import CreateProProfile from '../../components/profile-form/CreateProProfile';
import CreateCustProfile from '../../components/profile-form/CreateCustProfile';
import EditProProfile from '../../components/profile-form/EditProProfile';
import CustProProfile from '../../components/profile-form/EditCustProfile';
import AddExperience from '../../components/profile-form/AddExperience';
import AddEducation from '../../components/profile-form/AddEducation';
import ProProfiles from '../../components/profiles/ProProfiles';
import ProProfile from '../../components/profile/ProProfile';
import CurrentProProfile from '../../components/profile/CurrentProProfile';
import Articles from '../../components/main/Articles';
import Search from '../../components/main/Search';
import Alert from '../../components/layout/Alert';
import PrivateRoute from '../../components/routing/PrivateRoute';

const Routes = () => {
  return (
    <div>
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/pro-login" component={Prologin} />
          <Route exact path="/pro-register" component={Proregister} />
          <Route exact path="/pro-profile/:id" component={ProProfile} />
          <Route exact path="/pro-profile" component={CurrentProProfile} />
          <Route exact path="/pro-profiles" component={ProProfiles} />
          <Route exact path="/cust-login" component={Custlogin} />
          <Route exact path="/cust-register" component={Custregister} />
          <Route exact path="/cust-profile/:id" component={CustProfile} />
          <Route exact path="/cust-profile" component={CurrentCustProfile} />
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
          <PrivateRoute exact path="/user-control" component={UserControl} />
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
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <Route exact path="/about" component={About} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </section>
    </div>
  );
};

export default Routes;
