const mongoose = require('mongoose');


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
    console.log('Database is now connected');
  } catch (error) {
    console.error(error);
    throw new Error('Error connecting with database');
  }
};

module.exports = {
  connection,
};
