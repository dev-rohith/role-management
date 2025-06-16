import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

//user login route
router.post('/login', login);

//user register route
router.post('/register', register);

export default router;