import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '../layout/Avatar';
import { connect } from 'react-redux';
import { userUpdate, getUser } from '../../actions/auth';

const UserControl = ({
  auth: { loading, user },
  userUpdate,
  getUser,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    avatarId: '',
  });

  useEffect(() => {
    getUser();
    setFormData({
      name: loading || !user.name ? '' : user.name,
      email: loading || !user.email ? '' : user.email,
      password: loading || !user.password ? '' : user.password,
      password2: loading || !user.password2 ? '' : user.password2,
      avatarId: loading || !user.avatarId ? '' : user.avatarId,
    });
  }, [loading]);

  const { name, email, password, password2, avatarId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    userUpdate(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">User Information</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Please update your user information here
      </p>
      <Avatar />
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
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                  value={password2}
                  onChange={(e) => onChange(e)}
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

UserControl.propTypes = {
  auth: PropTypes.object.isRequired,
  userUpdate: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { userUpdate, getUser })(
  withRouter(UserControl)
);
