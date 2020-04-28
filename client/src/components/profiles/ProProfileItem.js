import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProProfileItem = ({
  profile: {
    user: { _id, name, avatarId },
    status,
    company,
    location,
    skills,
  },
}) => {
  const avatarPath = `api/avatar/image/${avatarId}`;
  return (
    <div className="profile bg-light">
      <div className="profiles-info-left text-center">
        <img src={avatarPath} alt="" className="round-img" />
      </div>
      <div className="profiles-info-middle">
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/proprofiles/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <div className="profiles-info-right">
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check" /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProProfileItem;
