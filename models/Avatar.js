const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

module.exports = Avatar = mongoose.model('avatar', AvatarSchema);
