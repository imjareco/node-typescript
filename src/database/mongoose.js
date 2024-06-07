import mongoose from 'mongoose';
import 'dotenv/config';
import logger from '../utils/logger.js';  // Asegúrate de que la exportación en logger.js es una exportación por defecto.

const { DDBB } = process.env;

export const connection = async () => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  };

  try {
    await mongoose.connect(DDBB, options);
    logger.info('Database is now connected');
  } catch (error) {
    logger.error('Error connecting with database', error);
    throw new Error('Error connecting with database');
  }
};