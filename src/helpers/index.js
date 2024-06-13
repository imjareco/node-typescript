import jwt from 'jsonwebtoken';

const { JWT } = process.env;

export const tokenBuilder = (id = '') => {
  const options = {
    expiresIn: '1h',
  };

  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, JWT, options, (error, token) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
};

export const bufferEncode = (target, type = 'base64') =>
  Buffer.from(target).toString(type);

export const bufferDecode = (target, type = 'base64') => Buffer.from(target, type);

