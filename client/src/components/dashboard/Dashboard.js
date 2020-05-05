import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProDashboardActions from '../dashboard/ProDashboardActions';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';
import CustDashboardActions from './CustDashboardAction';
import Avatar from '../layout/Avatar';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return profile == null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Welcome {user && user.name}</p>
      <div className="profile-top p-2">
        <Avatar />
      </div>
      <p>You can update your user information here:</p>
      <Link to="/user-control" className="btn btn-primary my-1">
        Update User infomation
      </Link>
      <br></br>
      {profile.professionalprofile == null &&
      profile.customerprofile == null ? (
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
        <Fragment>
          You have a <Link to="/pro-profile">professional profile</Link>.
          <ProDashboardActions />
          <br></br>
          You have a <Link to="/cust-profile">customer profile</Link>.
          <CustDashboardActions />
          <br></br>
          <Experience experience={profile.professionalprofile.experience} />
          <Education education={profile.professionalprofile.education} />
        </Fragment>
      ) : profile.customerprofile ? (
        <Fragment>
          You have a <Link to="/cust-profile">customer profile</Link>.
          <CustDashboardActions />
          <br></br>
          Are you qualified to sign up for a professional profile?
          <br></br>
          <Link to="/create-pro-profile" className="btn btn-primary my-1">
            Create Professional Profile
          </Link>
        </Fragment>
      ) : profile.professionalprofile ? (
        <Fragment>
          You have a <Link to="/pro-profile">professional profile</Link>.
          <ProDashboardActions />
          <br></br>
          <Link to="/create-cust-profile" className="btn btn-primary my-1">
            Create Customer Profile
          </Link>
          <br></br>
          <Experience experience={profile.professionalprofile.experience} />
          <Education education={profile.professionalprofile.education} />
        </Fragment>
      ) : (
        <Fragment>You don't have any profiles</Fragment>
      )}
      <div className="my-2">
        <button className="btn btn-danger" onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i> Delete my account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
