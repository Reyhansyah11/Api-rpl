// middleware/adminMiddleware.js
const adminMiddleware = async (req, res, next) => {
    try {
        console.log('Checking admin access for user:', req.user); // Tambahkan log

        if (!req.user) {
            console.log('No user found in request'); // Tambahkan log
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (req.user.role !== 'admin') {
            console.log('User role is not admin:', req.user.role); // Tambahkan log
            return res.status(403).json({ message: 'Access Forbidden | Admin only.' });
        }

        console.log('Admin access granted'); // Tambahkan log
        next();
    } catch (error) {
        console.error('Admin middleware error:', error); // Tambahkan log error
        return res.status(500).json({ message: 'Server Error' });
    }
};

export default adminMiddleware;