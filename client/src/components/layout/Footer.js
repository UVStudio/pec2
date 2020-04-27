import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="form">
        <form>
          <label>Sign up for our newsletter:</label>
          <input type="email" placeholder="Email Address" name="email" />
        </form>
      </div>
      <div>
        <p>Created by: UV Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
