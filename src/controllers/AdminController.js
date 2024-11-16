//controllers/AdminController.js
import Gallery from "../models/Gallery.js";
import TopProject from "../models/TopProject.js";
import Category from "../models/Category.js";

// CRUD untuk Category
export const createCategory = async (req, res) => {
    const { name_jurusan } = req.body;

    if (!name_jurusan) {
        return res.status(400).json({
            status: "error",
            message: "Name jurusan is required"
        });
    }

    try {
        const newCategory = await Category.create({ name_jurusan });
        res.status(201).json({
            status: "success",
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            status: "success",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name_jurusan } = req.body;

    if (!name_jurusan) {
        return res.status(400).json({
            status: "error",
            message: "Name jurusan is required"
        });
    }

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                status: "error",
                message: "Category not found"
            });
        }

        category.name_jurusan = name_jurusan;
        await category.save();

        res.status(200).json({
            status: "success",
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                status: "error",
                message: "Category not found"
            });
        }

        // Check if category is being used
        const galleryCount = await Gallery.count({ where: { category_id: id }});
        const projectCount = await TopProject.count({ where: { category_id: id }});

        if (galleryCount > 0 || projectCount > 0) {
            return res.status(400).json({
                status: "error",
                message: "Cannot delete category that is being used by galleries or projects"
            });
        }

        await category.destroy();
        res.status(200).json({
            status: "success",
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Update fungsi create Gallery
export const createGallery = async (req, res) => {
    const { name, quote, image, portfolio_url, category_id } = req.body;

    if (!name || !image || !category_id) {
        return res.status(400).json({
            status: "error",
            message: "Name, image, and category_id are required fields"
        });
    }

    try {
        // Verify category exists
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({
                status: "error",
                message: "Selected category does not exist"
            });
        }

        const newGallery = await Gallery.create({
            name,
            quote,
            image,
            portfolio_url,
            category_id
        });

        res.status(201).json({
            status: "success",
            message: "Gallery created successfully",
            data: newGallery,
        });
    } catch (error) {
        console.error("Error creating gallery:", error);
        res.status(500).json({
            status: "error",
            message: "Error creating gallery",
            error: error.message,
        });
    }
};

// Update fungsi update Gallery
export const updateGallery = async (req, res) => {
    const { id } = req.params;
    const { name, quote, image, portfolio_url, category_id } = req.body;

    if (!name && !image && !quote && !portfolio_url && !category_id) {
        return res.status(400).json({
            status: "error",
            message: "At least one field is required for update"
        });
    }

    try {
        const gallery = await Gallery.findByPk(id);
        if (!gallery) {
            return res.status(404).json({
                status: "error",
                message: "Gallery not found",
            });
        }

        // If category_id is being updated, verify the new category exists
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({
                    status: "error",
                    message: "Selected category does not exist"
                });
            }
            gallery.category_id = category_id;
        }

        if (name) gallery.name = name;
        if (quote) gallery.quote = quote;
        if (image) gallery.image = image;
        if (portfolio_url) gallery.portfolio_url = portfolio_url;
        
        await gallery.save();

        res.status(200).json({
            status: "success",
            message: "Gallery updated successfully",
            data: gallery,
        });
    } catch (error) {
        console.error("Error updating gallery:", error);
        res.status(500).json({
            status: "error",
            message: "Error updating gallery",
            error: error.message,
        });
    }
};

// Fungsi untuk mendapatkan semua galeri berdasarkan category_id
export const getGalleriesByCategory = async (req, res) => {
    const { category_id } = req.params; // Mengambil category_id dari URL params
    
    try {
        const galleries = await Gallery.findAll({
            where: { category_id }, // Mencari galeri berdasarkan category_id
            attributes: ["id", "name", "quote", "image", "portfolio_url", "createdAt"],
        });

        if (galleries.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No galleries found for the specified category",
            });
        }

        res.status(200).json({
            status: "success",
            data: galleries,
        });
    } catch (error) {
        console.error("Error fetching galleries by category:", error);
        res.status(500).json({
            status: "error",
            message: "Error fetching galleries by category",
            error: error.message,
        });
    }
};


// Fungsi untuk mengambil galeri berdasarkan ID
export const getGalleryById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const gallery = await Gallery.findByPk(id, {
            attributes: ["id", "name", "quote", "image", "portfolio_url", "createdAt"],
        });

        if (!gallery) {
            return res.status(404).json({
                status: "error",
                message: "Gallery not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: gallery,
        });
    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).json({
            status: "error",
            message: "Error fetching gallery",
            error: error.message,
        });
    }
};

// Fungsi untuk menghapus galeri berdasarkan ID
export const deleteGallery = async (req, res) => {
    const { id } = req.params;

    try {
        const gallery = await Gallery.findByPk(id);
        
        if (!gallery) {
            return res.status(404).json({
                status: "error",
                message: "Gallery not found",
            });
        }

        await gallery.destroy();

        res.status(200).json({
            status: "success",
            message: "Gallery deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting gallery:", error);
        res.status(500).json({
            status: "error",
            message: "Error deleting gallery",
            error: error.message,
        });
    }
};

// Fungsi untuk mendapatkan semua galeri
export const getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.findAll();
        res.status(200).json({
            status: "success",
            data: galleries,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching galleries",
            error: error.message,
        });
    }
};

// Update fungsi create TopProject
export const createTopProject = async (req, res) => {
    const { project_name, thumbnail, description, url_project, category_id } = req.body;

    if (!project_name || !thumbnail || !category_id) {
        return res.status(400).json({
            status: "error",
            message: "Project name, thumbnail, and category_id are required fields"
        });
    }

    try {
        // Verify category exists
        const category = await Category.findByPk(category_id);
        if (!category) {
            return res.status(404).json({
                status: "error",
                message: "Selected category does not exist"
            });
        }

        const newProject = await TopProject.create({
            project_name,
            thumbnail,
            description,
            url_project,
            category_id
        });

        res.status(201).json({
            status: "success",
            message: "Top project created successfully",
            data: newProject,
        });
    } catch (error) {
        console.error("Error creating top project:", error);
        res.status(500).json({
            status: "error",
            message: "Error creating top project",
            error: error.message,
        });
    }
};

// Fungsi untuk mendapatkan semua top projects berdasarkan category_id
export const getTopProjectsByCategory = async (req, res) => {
    const { category_id } = req.params; // Mengambil category_id dari parameter URL

    try {
        const topProjects = await TopProject.findAll({
            where: { category_id }, // Mencari top projects berdasarkan category_id
            attributes: ["id", "project_name", "thumbnail", "description", "url_project", "category_id", "createdAt"],
        });

        if (topProjects.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No top projects found for the specified category",
            });
        }

        res.status(200).json({
            status: "success",
            data: topProjects,
        });
    } catch (error) {
        console.error("Error fetching top projects by category:", error);
        res.status(500).json({
            status: "error",
            message: "Error fetching top projects by category",
            error: error.message,
        });
    }
};


// Fungsi untuk mendapatkan proyek unggulan berdasarkan ID
export const getTopProjectById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const project = await TopProject.findByPk(id);

        if (!project) {
            return res.status(404).json({
                status: "error",
                message: "Top project not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: project,
        });
    } catch (error) {
        console.error("Error fetching top project:", error);
        res.status(500).json({
            status: "error",
            message: "Error fetching top project",
            error: error.message,
        });
    }
};

//fungsi untuk mengdapatkan semua proyek unggulan
export const getAllTopProjects = async (req, res) => {
    try {
        const projects = await TopProject.findAll();
        res.status(200).json({
            status: 'success',
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};


// Update fungsi update TopProject
export const updateTopProject = async (req, res) => {
    const { id } = req.params;
    const { project_name, thumbnail, description, url_project, category_id } = req.body;

    if (!project_name && !thumbnail && !description && !url_project && !category_id) {
        return res.status(400).json({
            status: "error",
            message: "At least one field is required for update"
        });
    }

    try {
        const project = await TopProject.findByPk(id);
        if (!project) {
            return res.status(404).json({
                status: "error",
                message: "Top project not found",
            });
        }

        // If category_id is being updated, verify the new category exists
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({
                    status: "error",
                    message: "Selected category does not exist"
                });
            }
            project.category_id = category_id;
        }

        if (project_name) project.project_name = project_name;
        if (thumbnail) project.thumbnail = thumbnail;
        if (description) project.description = description;
        if (url_project) project.url_project = url_project;

        await project.save();

        res.status(200).json({
            status: "success",
            message: "Top project updated successfully",
            data: project,
        });
    } catch (error) {
        console.error("Error updating top project:", error);
        res.status(500).json({
            status: "error",
            message: "Error updating top project",
            error: error.message,
        });
    }
};

// Fungsi untuk menghapus proyek unggulan
export const deleteTopProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await TopProject.findByPk(id);

        if (!project) {
            return res.status(404).json({
                status: "error",
                message: "Top project not found",
            });
        }

        await project.destroy();

        res.status(200).json({
            status: "success",
            message: "Top project deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting top project:", error);
        res.status(500).json({
            status: "error",
            message: "Error deleting top project",
            error: error.message,
        });
    }
};