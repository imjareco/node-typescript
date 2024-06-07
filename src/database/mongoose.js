const mongoose = require('mongoose');
const { default: logger } = require('../utils');


const { DDBB } = process.env;

const connection = async () => {
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
    logger.error(error);
    throw new Error('Error connecting with database');
  }
};

module.exports = {
  connection,
};
