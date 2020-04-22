import React from 'react';
import { Link } from 'react-router-dom';

const CustDashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-custprofile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
    </div>
  );
};

export default CustDashboardActions;
