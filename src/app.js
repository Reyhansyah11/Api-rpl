// app.js
import cors from 'cors';
import express from 'express';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import galleryRoutes from './routes/gallery.js';
import adminRoutes from './routes/adminRoutes.js';
import topProjectRoutes from './routes/topProject.js';
import dotenv from 'dotenv';


// Memuat variabel lingkungan
dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:5173', // Alamat frontend React
  credentials: true,
}));

app.use(express.json());

// Menyediakan folder 'uploads' untuk file gambar
app.use('/uploads', express.static('public/uploads'));

app.use('/api/admin', adminRoutes);

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/top-projects', topProjectRoutes);

// Sinkronisasi dan jalankan server
sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
        app.listen(5000, () => {
            console.log('Server running on http://localhost:5000');
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
