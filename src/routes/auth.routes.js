import express from 'express';
import { validator } from '../middlewares/validator.js';
import { authSchema } from '../schemas/auth.validator.js';
import { signIn, signUp, logOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', validator('body', authSchema.login), signIn);
router.post('/register', validator('body', authSchema.register), signUp);
router.post('/logout', logOut);

export default router;
