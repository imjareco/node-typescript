const jwt = require('jsonwebtoken');

const { JWT } = process.env;

const tokenBuilder = (id = '') => {
  const options = {
    expiresIn: '1h',
  };

  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, JWT, options, (e, token) => {
      if (e) {
        console.error(e);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const bufferEncode = (target, type = 'base64') =>
  Buffer.from(target).toString(type);

const bufferDecode = (target, type = 'base64') => Buffer.from(target, type);

module.exports = {
  tokenBuilder,
  bufferEncode,
  bufferDecode,
};
