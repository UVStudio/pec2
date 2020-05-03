import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProProfile } from '../../actions/profile';
import ProfileTop from './CurrentProProfileTop';

const CurrentProProfile = ({
  getCurrentProProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProProfile();
  }, [getCurrentProProfile]);
  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/dashboard" className="btn btn-light">
            Back To Dashboard
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} auth={auth} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CurrentProProfile.propTypes = {
  getCurrentProProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProProfile })(
  CurrentProProfile
);
