const express = require('express');

const validator = require('../middlewares/validator');
const authSchema = require('../schemas/auth.validator');
const { signIn, signUp, logOut } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', validator('body', authSchema.login), signIn);
router.post('/register', validator('body', authSchema.register), signUp);
router.post('/logout', logOut);

module.exports = router;
