require('dotenv').config();

const Core = require('./src/core');

const core = new Core();

core.start();
