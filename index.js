import dotenv from 'dotenv';

dotenv.config();

import Core from './src/core.js';

const core = new Core();
core.start();
