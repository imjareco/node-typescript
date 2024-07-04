import bcrypt from 'bcryptjs';
import { bufferDecode } from '../helpers/index.js';
import User from '../models/user.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

export const findUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}); 
    return res.status(200).json(users);  
  } catch (error) {
    logger.error('Problems recovering users', error);
    if (error.code === 11000) {
      return res.status(409).send({ message: "Duplication error in the database" });
    }
    if (error.message.includes('validation')) {
      return res.status(400).send({ message: "Validation error on input data" });
    }
    next(error);
  }
};


export const updateUser = async (req , res) => {
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

export const updateUserPatch = async (req, res) => {
  const userId = req.user.id; // ID del usuario obtenido del middleware
  const updates = req.body;  // Datos para actualizar

  // Si el usuario envía una nueva contraseña, encriptarla
  if (updates.password) {
    const salt = bcrypt.genSaltSync(10);
    updates.password = bcrypt.hashSync(updates.password, salt);
  }

  try {
    // Aplicar los cambios y devolver el usuario actualizado
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
    logger.info("Successfully updated user")
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.sendStatus(204);
    logger.info("Successfully deleted user")
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


