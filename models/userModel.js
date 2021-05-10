const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      unique: true,
      trim: true,
      maxlength: [20, 'A user name must have less or equal then 40 characters'],
      minlength: [3, 'A user name must have more or equal then 6 characters'],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have a email'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    role: {
      type: String,
      enum: ['user', 'coach', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: [8, 'A password must need to have 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A password must need to confirm'],
      validate: {
        //only works on create and save!! this.password is not defined when we update
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
      select: false,
    },
    passwordChangeAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user',
});

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // delete the paasword confrim
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 10000;
  next();
});

userSchema.pre(/^find/, async function (next) {
  this.find({ active: true });
  next();
});

userSchema.methods.correctPassword = async function (candidatePw, userPw) {
  return await bcrypt.compare(candidatePw, userPw);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const convertTimestamp = parseInt(
      this.passwordChangeAt.getTime() - 1000,
      10
    );
    if (convertTimestamp > JWTTimestamp) {
      return true;
    }
  } else {
    return false;
  }
};

userSchema.methods.createPWResetToken = function () {
  // send to user for reseting Password
  const resetToken = crypto.randomBytes(32).toString('hex');

  //encrpto the resetToken
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
