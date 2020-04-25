import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Custprofile = () => {
  return (
    <Fragment>
      <Link to="/search" className="btn btn-light">
        Back To Search Profiles
      </Link>

      <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <div className="profile-info-left">
            <img
              className="round-img my-1"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
            <h1 className="large">John Doe</h1>
            <p className="lead">Registered Nurse</p>
            <p>Toronto, Ontario</p>
          </div>
          <div className="profile-info-right">
            <div className="tab">
              <button className="tablinks">Bio</button>
              <div id="Bio" className="tabcontent">
                <p>
                  Quisque et leo ut ex viverra imperdiet. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia
                  Curae; Suspendisse faucibus molestie blandit. Aenean ut
                  aliquet turpis. Curabitur ut tellus at quam fermentum iaculis
                  nec nec nulla. Fusce at pretium mauris. Duis et rutrum diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Custprofile;
