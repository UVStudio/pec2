import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';

const ProProfile = ({
  match,
  getProProfileById,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProProfileById(match.params.id);
  }, [getProProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/pro-profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProProfile.propTypes = {
  getProProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProProfileById })(ProProfile);
