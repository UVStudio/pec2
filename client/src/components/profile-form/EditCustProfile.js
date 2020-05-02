import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCustProfile, getCurrentProfile } from '../../actions/profile';

const EditCustProfile = ({
  profile: { profile, loading },
  createCustProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    need: '',
    location: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      location:
        loading || !profile.customerprofile.location
          ? ''
          : profile.customerprofile.location,
      need:
        loading || !profile.customerprofile.need
          ? ''
          : profile.customerprofile.need,
      bio:
        loading || !profile.customerprofile.bio
          ? ''
          : profile.customerprofile.bio,
      twitter:
        loading || !profile.customerprofile.social.twitter
          ? ''
          : profile.customerprofile.social.twitter,
      facebook:
        loading || !profile.customerprofile.social.facebook
          ? ''
          : profile.customerprofile.social.facebook,
      linkedin:
        loading || !profile.customerprofile.social.linkedin
          ? ''
          : profile.customerprofile.social.linkedin,
      youtube:
        loading || !profile.customerprofile.social.youtube
          ? ''
          : profile.customerprofile.social.youtube,
      instagram:
        loading || !profile.customerprofile.social.instagram
          ? ''
          : profile.customerprofile.social.instagram,
    });
  }, [loading]);

  const {
    need,
    location,
    bio,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createCustProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Customer Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Please tell us a few things about
        yourself and what are of help you need
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="need" value={need} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Needs</option>
            <option value="Registered Nurse">Registered Nurse</option>
            <option value="Professional Social Worker">
              Professional Social Worker
            </option>
            <option value="Doctor">Doctor</option>
          </select>
          <small className="form-text">
            Which professional service do you need?
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">
            If you can, tell us the details of your situation and what you are
            looking for.
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditCustProfile.propTypes = {
  createCustProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createCustProfile,
  getCurrentProfile,
})(withRouter(EditCustProfile));
