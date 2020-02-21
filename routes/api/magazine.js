const express = require('express');
const router = express.Router();

//@route  GET api/magazine
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Magazine route'));

module.exports = router;
