const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  image: {
    data: Buffer,
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Avatar = mongoose.model('avatar', AvatarSchema);
