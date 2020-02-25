const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token. Authorization denied' });
  }

  //if there is token, Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    console.log(decoded);
    //decoded looks like this: {
    //  user: { id: '5e5568111d42581e1cb7451b' },
    //  iat: 1582655505,
    //  exp: 1582691505
    // }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not found' });
  }
};
