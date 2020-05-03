import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProProfile, getCurrentProfile } from '../../actions/profile';

const EditProProfile = ({
  profile: { profile, loading },
  createProProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    contact: '',
    skills: '',
    bio: '',
    intro: '',
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
      company:
        loading || !profile.professionalprofile.company
          ? ''
          : profile.professionalprofile.company,
      website:
        loading || !profile.professionalprofile.website
          ? ''
          : profile.professionalprofile.website,
      location:
        loading || !profile.professionalprofile.location
          ? ''
          : profile.professionalprofile.location,
      status:
        loading || !profile.professionalprofile.status
          ? ''
          : profile.professionalprofile.status,
      contact:
        loading || !profile.professionalprofile.contact
          ? ''
          : profile.professionalprofile.contact,
      skills:
        loading || !profile.professionalprofile.skills
          ? ''
          : profile.professionalprofile.skills.join(','),
      bio:
        loading || !profile.professionalprofile.bio
          ? ''
          : profile.professionalprofile.bio,
      intro:
        loading || !profile.professionalprofile.intro
          ? ''
          : profile.professionalprofile.intro,
      twitter:
        loading || !profile.professionalprofile.social
          ? ''
          : profile.professionalprofile.social.twitter,
      facebook:
        loading || !profile.professionalprofile.social
          ? ''
          : profile.professionalprofile.social.facebook,
      linkedin:
        loading || !profile.professionalprofile.social
          ? ''
          : profile.professionalprofile.social.linkedin,
      youtube:
        loading || !profile.professionalprofile.social
          ? ''
          : profile.professionalprofile.social.youtube,
      instagram:
        loading || !profile.professionalprofile.social
          ? ''
          : profile.professionalprofile.social.instagram,
    });
  }, [loading]);

  const {
    company,
    website,
    location,
    status,
    contact,
    skills,
    bio,
    intro,
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
    createProProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        professional profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Registered Nurse">Registered Nurse</option>
            <option value="Professional Social Worker">
              Professional Social Worker
            </option>
            <option value="Doctor">Doctor</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Contact Email"
            name="contact"
            value={contact}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Your public email address</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website (eg. www.company.com)
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
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. Nursing, First-aid)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Introduction Video"
            name="intro"
            value={intro}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Post the YouTube embed code</small>
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
          Go back
        </Link>
      </form>
    </Fragment>
  );
};

EditProProfile.propTypes = {
  createProProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createProProfile,
  getCurrentProfile,
})(withRouter(EditProProfile));
