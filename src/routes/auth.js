// routes/auth.js
import express from 'express';
import { 
    adminRegister, 
    adminLogin, 
    register, 
    login 
} from '../controllers/authController.js';

const router = express.Router();

// Admin routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

// User routes
router.post('/register', register);
router.post('/login', login);

export default router;