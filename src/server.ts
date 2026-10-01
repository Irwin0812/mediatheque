import express, { Router } from 'express';
import * as pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';

// Configurer le dotenv
dotenv.config();

const app = express();
const router = Router();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion PostgreSQL
const pool = new pg.Pool({
  user: process.env.DB_USER || 'admirwin',
  password: process.env.DB_PASSWORD || 'OLaf@010743#g?',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'mediatheque'
});

// Gestion des erreurs PostgreSQL
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Générateur de token
function generateToken(user: any) {
  const payload = {
    id: user.id,
    username: user.username,
    admin: user.is_admin
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
}

// Hashage des mots de passe
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Démarrer le serveur
async function startServer() {
  // Ressourceshébergées
  const PORT = Number(process.env.PORT) || 3000;

  // Routes
  app.use('/auth', require('./routes/auth'));
  app.use('/users', require('./routes/users'));
  app.use('/comics', require('./routes/comics'));
  app.use('/vinyls', require('./routes/vinyls'));

  // Middleware d'authentification
  const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).send('Pas authentifié');
    }
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET!);
      if (!decoded) {
        return res.status(401).send('Token invalide');
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(500).send('Erreur lors de la vérification du token');
    }
  };

  // Protection des routes
  app.use('/api', authMiddleware);

  // Lancement du serveur
  try {
    await pool.connect();
    app.listen(PORT, () => {
      console.log(`Serveur backend lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error('Erreur au démarrage du serveur:', err);
  }
}

// Exporter le serveur pour les tests
export default app;

// Démarrer le serveur
startServer();1~import express, { Router } from 'express';
import * as pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';

// Configurer le dotenv
dotenv.config();

const app = express();
const router = Router();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion PostgreSQL
const pool = new pg.Pool({
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'mediatheque'
});

// Gestion des erreurs PostgreSQL
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Générateur de token
function generateToken(user: any) {
  const payload = {
    id: user.id,
    username: user.username,
    admin: user.is_admin
  };
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
}

// Hashage des mots de passe
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Démarrer le serveur
async function startServer() {
  // Ressourceshébergées
  const PORT = Number(process.env.PORT) || 3000;

  // Routes
  app.use('/auth', require('./routes/auth'));
  app.use('/users', require('./routes/users'));
  app.use('/comics', require('./routes/comics'));
  app.use('/vinyls', require('./routes/vinyls'));

  // Middleware d'authentification
  const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).send('Pas authentifié');
    }
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET!);
      if (!decoded) {
        return res.status(401).send('Token invalide');
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(500).send('Erreur lors de la vérification du token');
    }
  };

  // Protection des routes
  app.use('/api', authMiddleware);

  // Lancement du serveur
  try {
    await pool.connect();
    app.listen(PORT, () => {
      console.log(`Serveur backend lancé sur le port ${PORT}`);
    });
  } catch (err) {
    console.error('Erreur au démarrage du serveur:', err);
  }
}

// Exporter le serveur pour les tests
export default app;

// Démarrer le serveur
startServer();
