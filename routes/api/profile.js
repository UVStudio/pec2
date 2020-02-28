const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Proprofile = require('../../models/Proprofile');
const Custprofile = require('../../models/Custprofile');
const { check, validationResult } = require('express-validator');

//@route  GET api/profile/me
//@desc   Get current user's profile(s)
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const proprofile = await Proprofile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    const custprofile = await Custprofile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!proprofile && !custprofile) {
      return res
        .status(400)
        .json({ msg: 'This user does not have a profile set up.' });
    }
    //Fix later. Omit getting a profile if user does not have one
    res.json({
      professionalprofile: proprofile,
      customerprofile: custprofile
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/profile/proprofile
//@desc   Create or update a user PROFESSIONAL profile
//@access Private

router.post(
  '/proprofile',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required.')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    console.log(profileFields.social);

    try {
      let profile = await Proprofile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Proprofile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      console.log(profileFields);
      profile = new Proprofile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

//@route  POST api/profile/custprofile
//@desc   Create or update a user CUSTOMER profile
//@access Private

router.post(
  '/custprofile',
  auth,

  async (req, res) => {
    const { location, bio, facebook } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (facebook) profileFields.facebook = facebook;

    try {
      let profile = await Custprofile.findOne({ user: req.user.id });

      if (profile) {
        //Update
        profile = await Custprofile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      profile = new Custprofile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/profile/proprofiles
//@desc   Get all PROFESSIONAL profiles
//@access Public

router.get('/proprofiles', async (req, res) => {
  try {
    const profiles = await Proprofile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/profile/proprofile/user/:user_id
//@desc   Get PROFESSIONAL profile by user Id
//@access Public

router.get('/proprofile/user/:user_id', async (req, res) => {
  try {
    //req.params.user_id is getting the id from the URL/path
    const profile = await Proprofile.findOne({
      user: req.params.user_id
    }).populate('user', ['name']);
    //console.log(req.params.user_id); logs URL id
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user. (err.kind)' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/profile/proprofile
//@desc   Delete user's PROFESSIONAL profile
//@access Private

router.delete('/proprofile', auth, async (req, res) => {
  try {
    await Proprofile.findOneAndRemove({ user: req.user.id });
    res.json({ msg: 'Professional profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/profile/custprofile
//@desc   Delete user's CUSTOMER profile
//@access Private

router.delete('/custprofile', auth, async (req, res) => {
  try {
    await Custprofile.findOneAndRemove({ user: req.user.id });
    res.json({ msg: 'Customer profile deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
