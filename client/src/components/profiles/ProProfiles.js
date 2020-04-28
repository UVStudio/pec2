import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProProfileItem from '../profiles/ProProfileItem';
import { connect } from 'react-redux';
import { getProProfiles } from '../../actions/profile';

const ProProfiles = ({ getProProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProProfiles();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Professionals</h1>
          <div className="form">
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
            <input type="text" placeholder="Location" name="location" />
          </div>
          <p className="lead">Browse our professional health workers</p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProProfiles.propTypes = {
  getProProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProProfiles })(ProProfiles);
