import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Proregister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('no file selected');

  const { name, email, password, password2 } = formData;

  //[e.target.name] targets the key name, not the value name. onChange() would
  //work for all fields
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAvatar(e.target.files[0]);
    setAvatarName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Professional Account
      </p>
      <form>
        <div className="avatar-upload">
          <input
            type="file"
            className="avatar-upload-label"
            id="customAvatar"
            onChange={onChange}
          />
          <label className="avatar-upload-label" htmlFor="customAvatar">
            {avatarName}
          </label>
          <input type="submit" value="Upload" className="" />
        </div>
      </form>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            password={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="pro-login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Proregister;
