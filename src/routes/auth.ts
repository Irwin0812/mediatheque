import express, { Router } from 'express';
import passport from 'passport';
import { Pool } from 'pg';
import { NextFunction } from 'express';

const router = Router();
const pool = new Pool();

router.post('/login', async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM "fr"."users" WHERE "username" = $1',
      [username]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    
    const user = result.rows[0];
    if (!bcryptjs.compareSync(password, user.password_hash)) {
      return res.status(401).send('Mot de passe incorrect');
    }
    
    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req: any, res: any, next: any) => {
  try {
    const {
      username,
      password,
      email,
      isAdmin = false
    } = req.body;

    const hashedPassword = await hashPassword(password);
    
    await pool.query(
      'INSERT INTO "fr"."users"("username", "password_hash", "email", "is_admin") VALUES ($1, $2, $3, $4)',
      [username, hashedPassword, email, isAdmin]
    );
    
    res.status(201).send('Compte créé avec succès');
  } catch (err) {
    next(err);
  }
});
