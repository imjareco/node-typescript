
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {type: String, required: true,},
  lastname: {type: String, required: [true, `The lastname is required`],},
  username: {type: String,required: false ,unique: true,},
  email: {type: String,required: true,unique: true,},
  phone: {type: Number, require:true, unique:true, trim: true},
  adress: {type: String, require: true},
  location: {type: String, require: true, trim: true},
  city: {type: String, require: true, trim: true},
  postalCode: {type: Number, require: true, trim: true},
  password: {type: String,required: true,},
  
  status: {
    type: String,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  },

  role: {
    type: String,
    default: 'USER_ROLE',
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },

  lastSession: { type: Date },
  birthday: { type: Date },
}, { timestamps: true});

UserSchema.methods.toJSON = function () {
  const { _id, __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);