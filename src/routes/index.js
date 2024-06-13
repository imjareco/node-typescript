import express from 'express';
import { customLogger } from '../middlewares/logger.js';
import { secureStrategy } from '../middlewares/secureStrategy.js';
import { endpoint } from '../config.js';

import authRoutes from '../routes/auth.routes.js';
import userRoutes from '../routes/user.routes.js';

const router = express.Router();

// Main
router.use(endpoint.base, customLogger);

// Routes
router.use(endpoint.auth, authRoutes);
router.use(endpoint.user, secureStrategy, userRoutes);

export default router;