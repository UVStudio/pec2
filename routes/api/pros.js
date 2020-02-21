const express = require('express');
const router = express.Router();

//@route  GET api/pros
//@desc   Test route
//@access Public
router.get('/', (req, res) => res.send('Professionals route'));

module.exports = router;
