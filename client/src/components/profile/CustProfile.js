import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCustProfileById } from '../../actions/profile';
import ProfileTop from './CustProfileTop';

const CustProfile = ({
  match,
  getCustProfileById,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCustProfileById(match.params.id);
  }, [getCustProfileById, match.params.id]);
  return (
    <Fragment>
      {profile == null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} auth={auth} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

CustProfile.propTypes = {
  getCustProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCustProfileById })(CustProfile);
