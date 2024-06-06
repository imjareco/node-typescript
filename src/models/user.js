const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: [true, `The lastname is required`],
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  registerDate: {
    type: Date,
  },

  status: {
    type: String,
    default: 'INACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  },

  role: {
    type: String,
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },

  lastSession: { type: Date },
  birthday: { type: Date },
  locale: { type: String },
});

UserSchema.methods.toJSON = function () {
  const { _id, __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
