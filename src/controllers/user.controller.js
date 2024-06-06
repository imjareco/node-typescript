const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { bufferDecode } = require('../helpers');
const User = require('../models/user');

const findUserById = async (req = request, res = response) => {
  const { id } = req.params;
  const _id = bufferDecode(id).toString('ascii');
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(400).json({ msg: 'The user not exists' });
  }

  try {
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send({ error: 'Error to find user' });
  }
};

const getUsers = async (req = request, res = response) => {
  const users = await User.find({ status: 'ACTIVE' });

  if (!users) {
    return res.status(400).json({ msg: 'No users' });
  }

  try {
    res.status(201).json(users);
  } catch (error) {
    res.status(500).send({ error: 'Error to list users' });
  }
};

const updateUser = async (req = request, res = response) => {
  const { password, ...body } = req.body;
  let newKey = '';

  if (password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    newKey = bcrypt.hashSync(password, salt);
  }

  const newBody = { password: newKey, ...body };
  const id = req.header('user-session');

  try {
    const _id = bufferDecode(id);
    const options = { new: true };
    const userModel = await User.findOneAndUpdate({ _id }, newBody, options);

    res.status(200).json(userModel);
  } catch (error) {
    res.status(500).send({ error: 'Error to update the user' });
  }
};

const removeUser = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const _id = bufferDecode(id).toString('ascii');
    await User.findOneAndRemove({ _id });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error: 'Error to remove user' });
  }
};

module.exports = {
  findUserById,
  getUsers,
  updateUser,
  removeUser,
};
