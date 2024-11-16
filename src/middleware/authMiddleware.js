// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log('Auth Header:', authHeader); // Log yang sudah ada
        
        const token = authHeader && authHeader.split(' ')[1];
        console.log('Token:', token); // Log yang sudah ada
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Tambahkan log ini
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error); // Tambahkan log error
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;