import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Usercontrol = ({ auth, profile }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">User Information</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Please update your user information here
      </p>
      <div className="profile-grid my-1">
        <div className="profile-top p-2">
          <div className="profile-info-left">
            <img
              className="round-img my-1"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
          </div>
          <div className="profile-info-right">
            <form className="form" action="create-profile.html">
              <div className="form-group">
                <input type="text" placeholder="Name" name="name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary al-l"
                value="Update"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Usercontrol.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.register,
  profile: state.profile,
});

export default connect(mapStateToProps)(Usercontrol);
