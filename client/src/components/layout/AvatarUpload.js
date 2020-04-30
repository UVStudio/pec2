import React, { Fragment, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { avatarUpload } from '../../actions/avatar';

const AvatarUpload = ({ avatarUpload }) => {
  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('Select file');
  //const [uploadedFile, setUploadedFile] = useState({});

  const onChange = async (e) => {
    setAvatar(e.target.files[0]);
    setAvatarName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', avatar);

    try {
      avatarUpload(formData);
      //await axios.post('/api/avatar/upload', formData);
      // const { fileName, filePath } = res.data;
      // setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server.');
      } else {
        console.log(err.response);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="avatar-upload">
          <input
            type="file"
            name="file"
            id="custom-avatar"
            className="hidden short"
            onChange={onChange}
          />
          <label
            className="avatar-upload-label btn btn-primary"
            htmlFor="custom-avatar"
          >
            {avatarName}
          </label>
          <input id="avatar-upload" type="submit" value="" className="hidden" />
          <label
            className="avatar-upload-label btn btn-primary"
            htmlFor="avatar-upload"
          >
            Upload
          </label>
        </div>
      </form>
    </Fragment>
  );
};

AvatarUpload.propTypes = {
  avatarUpload: PropTypes.func.isRequired,
};

export default connect(null, { avatarUpload })(AvatarUpload);
