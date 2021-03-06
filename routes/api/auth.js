const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req, res) => {
  try {
    //req.user.id comes from middleware/auth.js
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/auth
//@desc   Authentic user & get token
//@access Public

//make sure it passes validation
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if validation passes
    //req.body.name, req.body.email,... etc
    const { email, password } = req.body;

    //check if user exists already
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //using bcrypt to compare req.body.password and user.password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      //create JWT to allow user to stay signed in
      // payload = { user: { id: '5efasfgq454qtrgafs' } } - the user id in mongoDB. the _ in front of id is not needed by mongoose
      const payload = {
        user: {
          id: user.id,
        },
      };
      //jwt.sign requires user.id(payload), jwtSecret from config-default.json, expiresIn(optional), callback to provide token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;
