const express = require('express');

const { customLogger } = require('../middlewares/logger');
const { secureStrategy } = require('../middlewares/secureStrategy');
const { endpoint } = require('../config');

const router = express.Router();

// Main
router.use(endpoint.base, customLogger);

// Routes
router.use(endpoint.auth, require('../routes/auth.routes'));
router.use(endpoint.user, secureStrategy, require('../routes/user.routes'));

module.exports = router;
