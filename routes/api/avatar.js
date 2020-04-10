const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../../models/User');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//mongo URI
const config = require('config');
const mongoURI = config.get('mongoURI');

//create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
conn.once('open', (req, res) => {
  //Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((res, rej) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          //the bucketName needs to match the collection name
          bucketName: 'uploads',
        };
        res(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route Get
// @desc  Loads from

router.get('/', (req, res) => {
  res.json({ msg: 'this works' });
});

// @route POST /upload
// @desc  Uploads file to DB

router.post('/upload', [auth, upload.single('file')], async (req, res) => {
  res.json({ file: req.file });
  const avatarId = req.file.id;
  try {
    const user = await User.findById(req.user.id);
    user.avatarId = avatarId;
    console.log(user);
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  //res.redirect('/')
});

// @routes GET /files
// @desc   Display all files in JSON

router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files exist
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist',
      });
    }
    return res.json(files);
  });
});

// @routes GET /files/:filename
// @desc   Display single file in JSON

router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files exist
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists for this',
      });
    }
    return res.json(file);
  });
});

// @routes GET /image/:filename
// @desc   Display all files in JSON

router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files exist
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/jpg' ||
      file.contentType === 'image/png'
    ) {
      //Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: 'Not an image' });
    }
  });
});

// withoutGridFS
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error('Wrong file type'), false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter
// });
//
// //@route  POST api/avatar
// //@desc   upload avatar for user
// //@access Private

// router.post('/', [auth, upload.single('avatar')], async (req, res) => {
//   const img = fs.readFileSync(req.file.path);
//   const encode_image = img.toString('base64');
//   const imgObj = {
//     contentType: req.file.mimetype,
//     user: req.user.id,
//     path: req.file.path,
//     image: new Buffer(encode_image, 'base64')
//   };
//   if (!imgObj) {
//     res.json({ msg: 'Please upload picture' });
//   }

//   try {
//     let avatar = await Avatar.findOne({ user: req.user.id });
//     // console.log(imgObj);
//     // console.log(avatar);
//     // if (avatar) {
//     //   //Update
//     //   avatar = await Avatar.findOneAndUpdate(
//     //     { user: req.user.id },
//     //     { $set: imgObj },
//     //     { new: true }
//     //   );
//     //   return res.json(avatar);
//     // }
//     //Create
//     avatar = new Avatar(imgObj);
//     avatar.user = req.user.id;
//     console.log(imgObj);
//     console.log(avatar);
//     await avatar.save();
//     res.json(avatar);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// //@route  DELETE api/avatar
// //@desc   Delete user avatar
// //@access private

// router.delete('/', auth, async (req, res) => {
//   try {
//     await Avatar.findOneAndRemove({ user: req.user.id });
//     res.json({ msg: 'Avatar deleted.' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
