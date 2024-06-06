const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { tokenBuilder, bufferEncode } = require('../helpers');
const User = require('../models/user');

const signIn = async (req = request, res = response) => {
  const { username, email, password } = req.body;

  try {
    // Check email exists
    const userModel = await User.findOne({ email });

    if (!userModel) {
      return res
        .status(400)
        .json({ msg: 'The email or password is incorrect' });
    }

    // Check user status

    // Compare password
    const isValid = bcrypt.compareSync(password, userModel.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ msg: 'The email or password is incorrect' });
    }

    // Generate token
    const id = userModel.get('id');
    const token = await tokenBuilder(id);

    res.setHeader('user-session', bufferEncode(id));
    res.setHeader('session-token', token);
    res.status(201).json(userModel);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error to login user' });
  }
};

const signUp = async (req = request, res = response) => {
  const { name, lastname, username, email, password } = req.body;
  const userModel = new User({ name, lastname, username, email, password });

  // Check email exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: 'The email already exists' });
  }

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  userModel.password = bcrypt.hashSync(password, salt);

  try {
    await userModel.save();
    res.status(201).json(userModel);
  } catch (error) {
    res.status(500).send({ error: 'Error to save user' });
  }
};

const logOut = async (req = request, res = response) => {
  const { email, lastSession } = req.body;

  // Check email exists
  const user = await User.findOneAndUpdate({ email }, { lastSession });
  if (!user) {
    return res.status(400).json({ msg: 'Wrong to logout' });
  }

  try {
    await user.update();
    res.status(201).text('Come back soon!');
  } catch (error) {
    res.status(500).send({ error: 'Error to logout' });
  }
};

module.exports = {
  signIn,
  signUp,
  logOut,
};
