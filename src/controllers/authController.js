//controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const adminRegister = async (req, res) => {
  try {
    const { username, email, password, adminCode } = req.body;

    // Validasi admin code
    if (adminCode !== process.env.ADMIN_CODE) {
      return res.status(400).json({ message: 'Invalid admin code' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin', // Set role sebagai admin
      adminCode, // Simpan admin code jika diperlukan
    });
    
    res.status(201).json({ message: 'Admin registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering admin', error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password, adminCode } = req.body;

    // Validasi admin code
    if (adminCode !== process.env.ADMIN_CODE) {
      return res.status(400).json({ message: 'Invalid admin code' });
    }

    const user = await User.findOne({ where: { email, role: 'admin' } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });

    res.json({ 
      message: 'Admin login successful',
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });

    res.json({ 
        message: 'Login successful',
        id: user.id,
        username: user.username,
        token,
     });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// export const getUsers = async (req, res) => {
//     try {
//       const users = await User.findAll(); // Mengambil semua user
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching users', error });
//     }
//   };
