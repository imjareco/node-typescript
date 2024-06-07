const express = require('express');
const validator = require('../middlewares/validator');
const userValidator = require('../schemas/user.validator');
const {
  findUserById,
  getUsers,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', validator('params', userValidator.get), findUserById);
router.put('/:id', validator('body', userValidator.put), updateUser);
router.delete('/:id', validator('params', userValidator.delete), removeUser);

module.exports = router;
