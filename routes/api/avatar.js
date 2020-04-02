const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Avatar = require('../../models/Avatar');
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

//@route  POST api/avatar
//@desc   upload avatar for user
//@access Private

router.post('/', [auth, upload.single('avatar')], async (req, res) => {
  const img = req.file.path;
  if (!img) {
    res.json({ msg: 'Please upload picture' });
  }

  try {
    let avatar = await Avatar.findOne({ user: req.user.id });

    if (avatar) {
      //Update
      avatar = await Avatar.findOneAndUpdate(
        { user: req.user.id },
        { $set: img },
        { new: true }
      );
      return res.json(avatar);
    }
    //Create
    avatar = new Avatar(avatar);
    avatar.user = req.user.id;
    await avatar.save();
    res.json(avatar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/avatar
//@desc   Delete user avatar
//@access private

router.delete('/', auth, async (req, res) => {
  try {
    await Avatar.findOneAndRemove({ user: req.user.id });
    res.json({ msg: 'Avatar deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
