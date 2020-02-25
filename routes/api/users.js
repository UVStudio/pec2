const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route  POST api/users
//@desc   Register customer user
//@access Public

//make sure it passes validation
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if validation passes
    //req.body.name, req.body.email,... etc
    const { name, email, password } = req.body;

    //check if user exists already
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }
      //if user does not exist, save user to mongoDB
      user = new User({
        name,
        email,
        password
      });
      //hash password before saving to mongoDB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //create JWT to allow user to stay signed in
      // payload = { user: { id: '5efasfgq454qtrgafs' } } - the user id in mongoDB. the _ in front of id is not needed by mongoose
      const payload = {
        user: {
          id: user.id
        }
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
