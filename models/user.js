const mongoose = require('mongoose');
const localPassport = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    default: false
  },
  fname: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
userSchema.plugin(localPassport);

const User = mongoose.model('user', userSchema);

module.exports = User;