import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Avatar = () => {
  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('no file selected');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = async (e) => {
    setAvatar(e.target.files[0]);
    setAvatarName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', avatar);

    try {
      const res = await axios.post('api/avatar/upload', formData);
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
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
            className="avatar-upload-label"
            id="customAvatar"
            onChange={onChange}
          />
          <label className="avatar-upload-label" htmlFor="customAvatar">
            {avatarName}
          </label>
          <input type="submit" value="Upload" />
        </div>
      </form>
    </Fragment>
  );
};

export default Avatar;
