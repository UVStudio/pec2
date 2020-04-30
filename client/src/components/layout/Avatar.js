import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAvatar } from '../../actions/avatar';

const Avatar = ({ auth: { loading, user } }) => {
  // useEffect(() => {
  //   getAvatar(avatarId);
  // }, []);

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
  getAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAvatar })(Avatar);
