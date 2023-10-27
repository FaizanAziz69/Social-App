import express from 'express';
import { allusers, loginUser, registerUser } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser)
router.get('/All',allusers)
export default router;

