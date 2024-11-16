//controllers/GalleryController.js
import Gallery from '../models/Gallery.js';
import Category from '../models/Category.js';

class GalleryController {
    // Get all galleries with their categories
    async getAllGalleries(req, res) {
        try {
            const galleries = await Gallery.findAll({
                include: [{
                    model: Category,
                    attributes: ['name_jurusan']
                }]
            });
            res.status(200).json({
                status: 'success',
                data: galleries
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Get single gallery by ID with its category
    async getGalleryById(req, res) {
        try {
            const { id } = req.params;
            const gallery = await Gallery.findByPk(id, {
                include: [{
                    model: Category,
                    attributes: ['name_jurusan']
                }]
            });
            
            if (!gallery) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Gallery not found'
                });
            }

            res.status(200).json({
                status: 'success',
                data: gallery
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    // Get galleries by category ID
    async getGalleriesByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            
            // Verify if category exists
            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }

            const galleries = await Gallery.findAll({
                where: {
                    category_id: categoryId
                },
                include: [{
                    model: Category,
                    attributes: ['name_jurusan']
                }]
            });

            res.status(200).json({
                status: 'success',
                data: {
                    category: category.name_jurusan,
                    galleries: galleries
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

export default GalleryController;

    // // Create new gallery
    // async createGallery(req, res) {
    //     try {
    //         const { name, qoute, image, portfolio_url } = req.body;

    //         // Basic validation
    //         if (!name || !qoute || !image) {
    //             return res.status(400).json({
    //                 status: 'error',
    //                 message: 'Name, quote, and image are required fields'
    //             });
    //         }

    //         const gallery = await Gallery.create({
    //             name,
    //             qoute,
    //             image,
    //             portfolio_url
    //         });

    //         res.status(201).json({
    //             status: 'success',
    //             data: gallery
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: error.message
    //         });
    //     }
    // }

    // // Update gallery
    // async updateGallery(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { name, qoute, image, portfolio_url } = req.body;

    //         const gallery = await Gallery.findByPk(id);

    //         if (!gallery) {
    //             return res.status(404).json({
    //                 status: 'error',
    //                 message: 'Gallery not found'
    //             });
    //         }

    //         await gallery.update({
    //             name: name || gallery.name,
    //             qoute: qoute || gallery.qoute,
    //             image: image || gallery.image,
    //             portfolio_url: portfolio_url || gallery.portfolio_url
    //         });

    //         res.status(200).json({
    //             status: 'success',
    //             data: gallery
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: error.message
    //         });
    //     }
    // }

    // // Delete gallery
    // async deleteGallery(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const gallery = await Gallery.findByPk(id);

    //         if (!gallery) {
    //             return res.status(404).json({
    //                 status: 'error',
    //                 message: 'Gallery not found'
    //             });
    //         }

    //         await gallery.destroy();

    //         res.status(200).json({
    //             status: 'success',
    //             message: 'Gallery deleted successfully'
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             status: 'error',
    //             message: error.message
    //         });
    //     }
    // }