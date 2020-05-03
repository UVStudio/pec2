import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentCustProfile } from '../../actions/profile';
import ProfileTop from './CurrentCustProfileTop';

const CurrentCustProfile = ({
  getCurrentCustProfile,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentCustProfile();
  }, [getCurrentCustProfile]);
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

CurrentCustProfile.propTypes = {
  getCurrentCustProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentCustProfile })(
  CurrentCustProfile
);
