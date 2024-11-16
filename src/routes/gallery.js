// routes/gallery.js
import express from 'express';
import GalleryController from '../controllers/GalleryController.js';

const router = express.Router();
const galleryController = new GalleryController();

router.get('/', galleryController.getAllGalleries);
router.get('/category/:categoryId', galleryController.getGalleriesByCategory);
router.get('/:id', galleryController.getGalleryById);
// router.post('/gallery', galleryController.createGallery);
// router.put('/:id', galleryController.updateGallery);
// router.delete('/:id', galleryController.deleteGallery);

export default router;