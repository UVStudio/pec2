const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //reject file

  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Wrong file type'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

//@route  POST api/users
//@desc   Register user, info and avatar
//@access Public

//make sure it passes validation
router.post(
  '/',
  [
    upload.single('avatar'),
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters.'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if validation passes
    //req.body.name, req.body.email,... etc
    const { name, email, password } = req.body;
    let avatar;
    if (req.file !== undefined) {
      avatar = req.file.path;
    } else {
      avatar = null;
    }

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
        password,
        avatar
      });
      //hash password before saving to mongoDB
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //console.log(user);
      await user.save();

      //create JWT to allow user to stay signed in
      //payload = { user: { id: '5efasfgq454qtrgafs' } } - the user id in mongoDB. the _ in front of id is not needed by mongoose
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
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

//@route  POST api/users/avatar/:id
//@desc   Upload user's avatar by Id
//@access private

router.post(
  '/avatar',
  auth,
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const avatar = req.file.path;
      const user = await User.findOne({ _id: req.user.id });

      user.avatar = avatar;
      console.log(user);
      await user.save();
      res.json({ user });
      next();
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

//@route  GET api/users/me
//@desc   Get current logged in user
//@access private

router.get('/me', auth, async (req, res) => {
  //why req.user object has no other properties except id???
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user) {
      res.json({ user });
    }
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/users/avatar
//@desc   Delete user avatar
//@access private

router.delete('/avatar', auth, async (req, res) => {
  //why req.user object has no other properties except id???
  try {
    const user = await User.findOne({ _id: req.user.id });
    user.avatar = null;

    res.json({ user });
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/users/:id/
//@desc   Update user info, including avatar
//@access private

router.put(
  '/',
  [
    auth,
    upload.single('avatar'),
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters.'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    let avatar;
    if (req.file !== undefined) {
      avatar = req.file.path;
    }
    const info = { name, email, password, avatar };

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            _id: req.user.id,
            ...info
          }
        },
        { new: true }
      );
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/users
//@desc   Delete user
//@access Private

router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
