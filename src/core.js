import express from 'express';
import cors from 'cors';
import { connection } from './database/mongoose.js';
import routes from './routes/index.js'; // Asegúrate de que los archivos importados también usen exportaciones ES6
import logger from './utils/logger.js'; // Ajusta esta línea según tus archivos

const { PORT } = process.env;

class Core {
  constructor() {
    this.app = express();
    this.port = PORT || 3000;

    this.databaseConnection();
    this.useMiddlewares();
    this.useRoutes();
  }

  async databaseConnection() {
    await connection();
  }

  useMiddlewares() {
    this.app.use(cors({ origin: 'http://localhost:3000' }));
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  useRoutes() {
    this.app.use(routes);

    // Ruta para servir la aplicación
    this.app.get('*', (req, res) =>
      res.sendFile(`${process.cwd()}/public/index.html`)
    );
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server running at http://localhost:${this.port}`);
    });
  }
}

export default Core; // Exporta Core usando export default
