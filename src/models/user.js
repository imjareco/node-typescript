import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false },
  username: { type: String, required: false, unique: true },
  email: { type: String, required: [true, 'The email is required'] , unique: true },
  phone: { type: Number, required: true, unique: true, trim: true },
  adress: { type: String, required: true },
  location: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: Number, required: true, trim: true },
  password: { type: String, required: true },

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
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  user.uid = this._id;
  return user;
};

export default model('User', UserSchema);
