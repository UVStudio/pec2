const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Article = require('../../models/Article');
const Proprofile = require('../../models/Proprofile');
const User = require('../../models/User');

//@route  POST api/articles
//@desc   Create an article
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const profile = await Proprofile.findOne({ user: req.user.id }).select(
      '-password'
    );
    if (!profile) {
      return res.status(400).json({
        msg:
          'You are not allowed to post articles without a professional profile.'
      });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newArticle = new Article({
        text: req.body.text,
        name: user.name,
        user: req.user.id
      });
      const article = await newArticle.save();
      res.json(article);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/articles
//@desc   Get all articles
//@access Public

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/articles/:id
//@desc   Get article by id
//@access Public

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.json(article);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/articles/:id
//@desc   Delete article by Id
//@access Public

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //check user
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await article.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile/:id
//@desc   Edit article
//@access Private

router.put(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const profile = await Proprofile.findOne({ user: req.user.id }).select(
      '-password'
    );
    if (!profile) {
      return res.status(400).json({
        msg:
          'You are not allowed to edit articles without a professional profile.'
      });
    }
    try {
      //const user = await User.findById(req.user.id).select('-password');
      const newText = req.body.text;
      console.log(newText);
      const article = await Article.findOneAndUpdate(
        { user: req.user.id, _id: req.params.id },
        {
          $set: {
            // I don't want my education id to change
            _id: req.params.id,
            text: newText
          }
        },
        { new: true }
      );
      await article.save();
      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
