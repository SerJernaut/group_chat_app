const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { PROFILE_PICTURE_PATH } = require('../constants');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({

  login: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    match: /^\w{6,16}$/,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    select: false,
  },
  profilePicture: {
    type: Schema.Types.String,
    get: value => {
      if (value) {
        return `${ PROFILE_PICTURE_PATH }/${ value }`
      }
      return '';
    },
  },
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function comparePassword(data) {
  return bcrypt.compare(data, this.password);
};

userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
