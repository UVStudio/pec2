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
              <button className="tablinks" onclick="openCity(event, 'Bio')">
                Bio
              </button>
              <button
                className="tablinks"
                onclick="openCity(event, 'Experience')"
              >
                Experience
              </button>
              <button
                className="tablinks"
                onclick="openCity(event, 'Education')"
              >
                Education
              </button>
              <button className="tablinks" onclick="openCity(event, 'Skills')">
                Skills
              </button>
              <button className="tablinks" onclick="openCity(event, 'Video')">
                Video
              </button>
            </div>

            <div id="Bio" className="tabcontent">
              <p>
                Quisque et leo ut ex viverra imperdiet. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Suspendisse faucibus molestie blandit. Aenean ut aliquet
                turpis. Curabitur ut tellus at quam fermentum iaculis nec nec
                nulla. Fusce at pretium mauris. Duis et rutrum diam.
              </p>
            </div>

            <div id="Experience" className="tabcontent">
              <div className="experience-item">
                <h3 className="text-white pb">Microsoft</h3>
                <p>Oct 2011 - Current</p>
                <p className="pb">
                  <strong>Position: </strong>Senior Developer
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos placeat, dolorum ullam ipsam, sapiente suscipit
                  dicta eius velit amet aspernatur asperiores modi quidem
                  expedita fugit.
                </p>
              </div>
              <div className="experience-item">
                <h3 className="text-white pb">Sun Microsystems</h3>
                <p>Nov 2004 - Nov 2011</p>
                <p className="pb">
                  <strong>Position: </strong>Systems Admin
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos placeat, dolorum ullam ipsam, sapiente suscipit
                  dicta eius velit amet aspernatur asperiores modi quidem
                  expedita fugit.
                </p>
              </div>
            </div>

            <div id="Education" className="tabcontent">
              <div className="experience-item">
                <h3 className="text-white pb">University Of Washington</h3>
                <p>Sep 1993 - June 1999</p>
                <p>
                  <strong>Degree: </strong>Masters
                </p>
                <p className="pb">
                  <strong>Field Of Study: </strong>Computer Science
                </p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Dignissimos placeat, dolorum
                  ullam ipsam, sapiente suscipit dicta eius velit amet
                  aspernatur asperiores modi quidem expedita fugit.
                </p>
              </div>
            </div>
            <div id="Skills" className="tabcontent">
              <div className="skills">
                <div className="p">
                  <i className="fa fa-check"></i> HTML
                </div>
                <div className="p">
                  <i className="fa fa-check"></i> CSS
                </div>
                <div className="p">
                  <i className="fa fa-check"></i> JavaScript
                </div>
                <div className="p">
                  <i className="fa fa-check"></i> Python
                </div>
                <div className="p">
                  <i className="fa fa-check"></i> C#
                </div>
              </div>
            </div>
            <div id="Video" className="tabcontent video-content">
              <p>
                <iframe
                  title="YouTube Video"
                  width="480"
                  height="270"
                  src="https://www.youtube.com/embed/VzcNPKTrC90"
                ></iframe>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Custprofile;
