const { request, response } = require('express');

const { NODE_ENV } = process.env;

exports.customLogger = (req = request, res = response, next) => {
  // Wiston Logger

  if (NODE_ENV !== 'production') {
    const { method, path } = req;
    const request = `[${method}] --> ${path}`;
    console.log(request);
  }

  next();
};
