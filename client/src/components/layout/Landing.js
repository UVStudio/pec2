import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/user-control" />;
  }

  return (
    <section className="landing">
      <div className="landing-inner landing-pro">
        <div className="text-box">
          <h1 className="large">I'm a qualified healthcare professional</h1>
        </div>
        <div className="buttons">
          <Link to="pro-register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="pro-login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
      <div className="landing-inner landing-cust">
        <div className="text-box">
          <h1 className="large">I'm seeking a healthcare professional</h1>
        </div>
        <div className="buttons">
          <Link to="cust-register" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="cust-login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
      <div className="landing-inner landing-articles">
        <div className="text-box">
          <h1 className="large">I'm looking for healthcare information</h1>
        </div>
        <div className="buttons">
          <Link to="articles" className="btn btn-primary">
            Read Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
