import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const openTab = (e, tab) => {
  let i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = 'block';
  e.currentTarget.className += ' active';
};

const ProfileTop = ({
  auth: { token },
  profile: {
    status,
    contact,
    bio,
    intro,
    company,
    location,
    website,
    social,
    skills,
    experience,
    education,
    user: { _id, name, avatarId },
  },
}) => {
  const avatarPath = `/api/avatar/image/${avatarId}`;
  return (
    <div>
      <div className="profile-top bg-primary p-2">
        <div className="profile-info-left">
          <img
            src={avatarPath ? avatarPath : ''}
            alt=""
            className="round-img"
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status}</p>
          {token ? (
            <p className="lead">
              <a href={'mailto:' + contact}>{'Email ' + name}</a>
            </p>
          ) : (
            'Register to contact this professional'
          )}
          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
            {website && (
              <a
                href={'http://' + website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {social && social.twitter && (
              <a
                href={'http://' + social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {social && social.facebook && (
              <a
                href={'http://' + social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={'http://' + social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}
            {social && social.youtube && (
              <a
                href={'http://' + social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {social && social.instagram && (
              <a
                href={'http://' + social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </div>
        </div>
        <div className="profile-info-right">
          <div className="tab">
            <button className="tablinks" onClick={(e) => openTab(e, 'Bio')}>
              Bio
            </button>
            <button
              className="tablinks"
              onClick={(e) => openTab(e, 'Experience')}
            >
              Experience
            </button>
            <button
              className="tablinks"
              onClick={(e) => openTab(e, 'Education')}
            >
              Education
            </button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Skills')}>
              Skills
            </button>
            <button className="tablinks" onClick={(e) => openTab(e, 'Video')}>
              Video
            </button>
          </div>

          <div id="Bio" className="tabcontent">
            {bio ? <p>{bio}</p> : 'This person has not written a bio'}
          </div>
          <div id="Experience" className="tabcontent">
            {experience.length > 0 ? (
              <Fragment>
                {experience.map((experience) => (
                  <ProfileExperience
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </Fragment>
            ) : (
              <h4>No experience provided.</h4>
            )}
          </div>

          <div id="Education" className="tabcontent">
            {education.length > 0 ? (
              <Fragment>
                {education.map((education) => (
                  <ProfileEducation key={education._id} education={education} />
                ))}
              </Fragment>
            ) : (
              <h4>No education provided.</h4>
            )}
          </div>
          <div id="Skills" className="tabcontent">
            <div className="skills">
              {skills.map((skill, index) => (
                <div key={index} className="p-1">
                  <i className="fas fa-check"></i>
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div id="Video" className="tabcontent video-content">
            <p>
              <iframe
                title="YouTube video"
                width="480"
                height="270"
                src={intro}
              ></iframe>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//https://www.youtube.com/embed/r6R2PZebALc

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
