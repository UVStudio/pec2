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
      let tags = req.body.tags;
      if (tags) {
        tags = tags.split(',').map(tag => tag.trim());
      }
      const newArticle = new Article({
        text: req.body.text,
        tags,
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
//@access Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //check user
    if (article.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await article.remove();
    res.json({ msg: 'Article deleted' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/articles/:id
//@desc   Edit article by Id
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
      const newText = req.body.text;
      const article = await Article.findOneAndUpdate(
        { user: req.user.id, _id: req.params.id },
        {
          $set: {
            // I don't want my article id to change
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

//@route  PUT api/articles/like/:id
//@desc   Like an article
//@access Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //check to see if article has already been liked by user
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Article already liked.' });
    }
    article.likes.unshift({ user: req.user.id });
    await article.save();
    res.json(article.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/articles/unlike/:id
//@desc   Like an article
//@access Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //check to see if article has already been liked by user
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Article has not been liked by you.' });
    }
    //Get remove index
    const removeIndex = article.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    article.likes.splice(removeIndex, 1);
    await article.save();
    res.json(article.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/articles/comment/:id
//@desc   Create a comment to an article
//@access Private

router.post(
  '/comment/:id',
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
    try {
      const user = await User.findById(req.user.id).select('-password');
      const article = await Article.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };
      article.comments.unshift(newComment);
      await article.save();
      res.json(article.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  DELETE api/articles/comment/:id/:comment_id
//@desc   Delete comment by Id
//@access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    //pull out comment
    const comment = article.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //Make sure comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist.' });
    }
    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    //Get remove index
    const removeIndex = article.comments
      .map(comment => comment.user.toString())
      .indexOf(req.params.comment_id);
    article.comments.splice(removeIndex, 1);
    await article.save();
    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/articles/comment/:id/:comment_id
//@desc   Edit comment by Id
//@access Private

router.put(
  '/comment/:id/:comment_id',
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
    try {
      const article = await Article.findById(req.params.id);
      //pull out comment
      const comment = article.comments.find(
        comment => comment.id === req.params.comment_id
      );
      //Make sure comment exist
      if (!comment) {
        return res.status(404).json({ msg: 'Comment does not exist.' });
      }
      //check user
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
      //assign new text to text object
      comment.text = req.body.text;
      await article.save();
      res.json(comment.text);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
