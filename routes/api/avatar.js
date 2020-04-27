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
const ObjectID = require('mongodb').ObjectID;

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

// router.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files exist
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map((file) => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/jpg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

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

// router.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if files exist
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists for this',
//       });
//     }
//     return res.json(file);
//   });
// });

// @routes GET /image/:filename
// @desc   Display image by file name

// router.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if files exist
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }
//     if (
//       file.contentType === 'image/jpeg' ||
//       file.contentType === 'image/jpg' ||
//       file.contentType === 'image/png'
//     ) {
//       //Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({ err: 'Not an image' });
//     }
//   });
// });

// @routes GET /files/:avatarId
// @desc   Display image by avatarId

router.get('/image/:id', (req, res) => {
  gfs.files.findOne({ _id: ObjectID(req.params.id) }, (err, file) => {
    // Check if files exist
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }
    //Read output to browser
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

// @routes GET /image/:filename
// @desc   Display image by userId

// router.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if files exist
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists',
//       });
//     }
//     if (
//       file.contentType === 'image/jpeg' ||
//       file.contentType === 'image/jpg' ||
//       file.contentType === 'image/png'
//     ) {
//       //Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({ err: 'Not an image' });
//     }
//   });
// });

module.exports = router;
