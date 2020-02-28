const mongoose = require('mongoose');
const CustSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  facebook: {
    type: String
  }
});

module.exports = Cust = mongoose.model('custprofile', CustSchema);
