import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import { bufferDecode } from '../helpers/index.js';
import User from '../models/user.js';

export const findUserById = async (req = request, res = response) => {
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

export const getUsers = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const users = await createUser(body);
    return res.status(201).send(users);
  } catch (error) {
    console.error('Problemas al crear un usuario', error);
    if (error.code === 11000) {
      error.status = 409;
    }
    if (error.message.includes('validation')) {
      error.status = 400;
    }
    next(error);
  }
};

export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (req = request, res = response) => {
  const { password, ...body } = req.body;
  let newKey = '';

  if (password) {
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    newKey = bcrypt.hashSync(password, salt);
  }

  const newBody = { ...body, password: newKey };
  const id = req.header('user-session');
  const _id = bufferDecode(id).toString('ascii');

  try {
    const options = { new: true };
    const userModel = await User.findOneAndUpdate({ _id }, newBody, options);
    res.status(200).json(userModel);
  } catch (error) {
    res.status(500).send({ error: 'Error to update the user' });
  }
};

export const removeUser = async (req = request, res = response) => {
  const { id } = req.params;
  const _id = bufferDecode(id).toString('ascii');

  try {
    await User.findOneAndRemove({ _id });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error: 'Error to remove user' });
  }
};
