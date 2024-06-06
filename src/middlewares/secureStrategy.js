const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { bufferDecode } = require('../helpers');

const { JWT } = process.env;

exports.secureStrategy = (req = request, res = response, next) => {
  const token = req.header('session-token');
  const user = req.header('user-session');

  if (!token && !user) {
    return res.status(401).send({
      message: 'The request does not have the authentication header',
    });
  }

  try {
    // Decode token
    const { id, exp } = jwt.verify(token, JWT);

    if (Date.now() > exp * 1000) {
      return res.status(403).send({ message: 'The token has expired' });
    } else if (id !== bufferDecode(user).toString('ascii')) {
      return res.status(403).send({ message: 'The token has been suplanted' });
    }
  } catch (err) {
    console.error(err);
    return res.status(403).send({ message: 'The token is not valid' });
  }

  next();
};
