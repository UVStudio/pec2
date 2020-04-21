import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Welcome {user && user.name}</p>

      {
        /*profile.professionalprofile !== null &&
      profile.customerprofile !== null ? (
        <Fragment>You have both profiles</Fragment>
      ) : profile.customerprofile !== null ? (
        <Fragment>You have a customer profile</Fragment>
      ) : profile.professionalprofile !== null ? (
        <Fragment>You have a pro profile</Fragment>
      ) : (
        <Fragment>You have no profile.</Fragment>
      )*/
        profile == null ? (
          <Fragment>
            You don't have any profiles
            <br></br>
            <Link to="/create-pro-profile" className="btn btn-primary my-1">
              Create Professional Profile
            </Link>
            <Link to="/create-cust-profile" className="btn btn-primary my-1">
              Create Customer Profile
            </Link>
          </Fragment>
        ) : profile.professionalprofile && profile.customerprofile ? (
          <Fragment>You have both profiles</Fragment>
        ) : profile.customerprofile ? (
          <Fragment>
            You have a customer profile. Are you qualified to sign up for a
            professional profile?
            <br></br>
            <Link to="/create-pro-profile" className="btn btn-primary my-1">
              Create Professional Profile
            </Link>
          </Fragment>
        ) : profile.professionalprofile ? (
          <Fragment>
            You have a professional profile
            <br></br>
            <Link to="/create-cust-profile" className="btn btn-primary my-1">
              Create Customer Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>You don't have any profiles</Fragment>
        )
      }
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
