import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Prologin from './components/auth/Prologin';
import Proregister from './components/auth/Proregister';
import Custlogin from './components/auth/Custlogin';
import Custregister from './components/auth/Custregister';
import Usercontrol from './components/auth/Usercontrol';
import About from './components/main/About';
import Articles from './components/main/Articles';
import Search from './components/main/Search';
import Alert from './components/layout/Alert';

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
              <Route exact path="/cust-login" component={Custlogin} />
              <Route exact path="/cust-register" component={Custregister} />
              <Route exact path="/user-control" component={Usercontrol} />
              <Route exact path="/about" component={About} />
              <Route exact path="/articles" component={Articles} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
