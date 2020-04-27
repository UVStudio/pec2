import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Avatar = ({ auth: { loading, user } }) => {
  let avatarId;

  if (!loading) {
    avatarId = user.avatarId;
  }

  const avatarPath = `api/avatar/image/${avatarId}`;

  return (
    <div className="profile-info-left">
      <img className="round-img my-1" src={avatarId ? avatarPath : ''} alt="" />
    </div>
  );
};

Avatar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Avatar);
