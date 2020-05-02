const mongoose = require('mongoose');
const CustSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  need: {
    type: String,
  },
  contact: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

module.exports = Cust = mongoose.model('custprofile', CustSchema);
