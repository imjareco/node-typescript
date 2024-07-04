
import bcrypt from 'bcryptjs';
import { tokenBuilder, bufferEncode } from '../helpers/index.js';
import User from '../models/user.js';
import logger from '../utils/logger.js';

export const signIn = async (req, res) => {
  const { login, password } = req.body; // Usar 'login' para aceptar tanto email como username

  try {
    // Buscar usuario por email o username
    const userModel = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });

    if (!userModel) {
      return res
        .status(400)
        .json({ msg: 'The username/email or password is incorrect' });
    }

    // Comparar contraseña
    const isValid = bcrypt.compareSync(password, userModel.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ msg: 'The username/email or password is incorrect' });
    }

    // Generar token
    const id = userModel._id;
    const token = await tokenBuilder(id);

    // Configurar cabeceras
    res.setHeader('user-session', bufferEncode(id));
    res.setHeader('session-token', token);

    const userResponse = {
      _id: userModel._id,
      name: userModel.name,
      lastname: userModel.lastname,
      username: userModel.username,
      email: userModel.email,
      phone: userModel.phone,
      adress: userModel.adress,
      location: userModel.location,
      city: userModel.city,
      postalCode: userModel.postalCode,
      status: userModel.status,
      role: userModel.role,
      createdAt: userModel.createdAt,
      updatedAt: userModel.updatedAt,
      token: token
    };

    res.status(200).json(userResponse); 
    logger.info("User logged in successfully");
  } catch (error) {
    res.status(500).send({ error: 'Error to login user' });
    logger.error(error);
  }
};


export const signUp = async (req, res) => {
  const { name, lastname, username, email, phone, adress, location, city, postalCode, password } = req.body;

  try {
    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'The email already exists' });
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user instance
    const userModel = new User({
      name, 
      lastname, 
      username, 
      email,
      phone,
      adress,
      location,
      city,
      postalCode, 
      password: hashedPassword
    });

    await userModel.save();
    res.status(201).json({ user: userModel.toJSON() });
    logger.info("User created successfully");
  } catch (error) {
    logger.error('SignUp Error:', error); 
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }
    res.status(500).json({ error: 'Error to save user', details: error.message });
  }
};


export const logOut = async (req, res) => {
  const { email } = req.body;  // lastSession podría eliminarse si no necesitas registrar el momento exacto del logout

  try {
    // Busca el usuario y actualiza lastSession si lo deseas registrar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    res.status(200).send('Come back soon!');
    logger.info("Successfully logged out")
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Error to logout' });
  }
};
