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
    const proprofile = await Proprofile.findOne({ user: req.user.id });
    const custprofile = await Custprofile.findOne({ user: req.user.id });
    if (!proprofile && !custprofile) {
      return res
        .status(400)
        .json({ msg: 'This user does not have a profile set up.' });
    }
    //Fix later. Omit getting a profile if user does not have one
    res.json({
      professionalprofile: proprofile,
      customerprofile: custprofile,
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
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required.').not().isEmpty(),
    ],
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
      linkedin,
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
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

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
    const { need, location, bio, facebook } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (need) profileFields.need = need;
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
      user: req.params.user_id,
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

//@route  PUT api/profile/proprofile/experience
//@desc   Add PROFESSIONAL profile experience
//@access Private
//@date   Date in Postman is formatted as this: 01-20-2020 (Jan 20th 2020)

router.put(
  '/proprofile/experience',
  [
    auth,
    [
      check('title', 'Title is required.').not().isEmpty(),
      check('company', 'Company is required.').not().isEmpty(),
      check('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Proprofile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/proprofile/experience/:exp_id
//@desc   Delete PROFESSIONAL profile experience
//@access Private

router.delete('/proprofile/experience/:exp_id', auth, async (req, res) => {
  try {
    //find the right proprofile
    const profile = await Proprofile.findOne({ user: req.user.id });
    //Get the desired experience to remove by exp_id using indexOf
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json({ professionalprofile: profile, customerprofile: profile });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile/proprofile/experience/:exp_id
//@desc   Edit PROFESSIONAL profile experience
//@access Private

router.put(
  '/proprofile/experience/:exp_id',
  [
    auth,
    [
      check('title', 'Title is required.').not().isEmpty(),
      check('company', 'Company is required.').not().isEmpty(),
      check('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const exp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Proprofile.findOneAndUpdate(
        { user: req.user.id, 'experience._id': req.params.exp_id },
        {
          $set: {
            // I don't want my experience id to change
            'experience.$': { _id: req.params.exp_id, ...exp },
          },
        },
        { new: true }
      );
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  PUT api/profile/proprofile/education
//@desc   Add PROFESSIONAL profile education
//@access Private

router.put(
  '/proprofile/education',
  [
    auth,
    [
      check('school', 'School is required.').not().isEmpty(),
      check('qualification', 'Qualification is required.').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required.').not().isEmpty(),
      check('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      qualification,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      qualification,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Proprofile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/proprofile/education/:edu_id
//@desc   Delete PROFESSIONAL profile education
//@access Private

router.delete('/proprofile/education/:edu_id', auth, async (req, res) => {
  try {
    //find the right proprofile
    const profile = await Proprofile.findOne({ user: req.user.id });
    //Get the desired education to remove by edu_id using indexOf
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile/proprofile/education/:edu_id
//@desc   Edit PROFESSIONAL profile education
//@access Private

router.put(
  '/proprofile/education/:edu_id',
  [
    auth,
    [
      check('school', 'School is required.').not().isEmpty(),
      check('qualification', 'Qualification is required.').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required.').not().isEmpty(),
      check('from', 'From date is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //assigning new info to edu object
    const {
      school,
      qualification,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const edu = {
      school,
      qualification,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Proprofile.findOneAndUpdate(
        { user: req.user.id, 'education._id': req.params.edu_id },
        {
          $set: {
            // I don't want my education id to change
            'education.$': { _id: req.params.edu_id, ...edu },
          },
        },
        { new: true }
      );
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  PUT api/profile/proprofile/rating
//@desc   Rate a PROFESSIONAL by profile id
//@access Private

router.put(
  '/proprofile/:id/rating',
  [auth, [check('rating', 'Rating is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const rating = req.body.rating;
      const profile = await Proprofile.findOne({ user: req.params.id });
      //check to see if article has already been liked by user
      if (
        profile.ratings.filter(
          (rating) => rating.user.toString() === req.user.id
        ).length > 0
      ) {
        return res.status(400).json({ msg: 'You rated this profile already.' });
      }
      profile.ratings.unshift({ user: req.user.id, rating });
      await profile.save();
      res.json(profile.ratings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
