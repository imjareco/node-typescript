import express from 'express';
import { validator } from '../middlewares/validator.js';
import { userValidatorSchema } from '../schemas/user.validator.js';
import {
  findUserById,
  getUsers,
  createUser,
  updateUser,
  removeUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', validator('params', userValidatorSchema.get), findUserById);
router.put('/:id', validator('body', userValidatorSchema.put), updateUser);
router.delete('/:id', validator('params', userValidatorSchema.delete), removeUser);

export default router;
