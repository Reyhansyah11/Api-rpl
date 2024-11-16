import express from "express";
import {
  // Existing imports
  createGallery,
  updateGallery,
  getGalleryById,
  deleteGallery,
  // getAllGalleries,
  createTopProject,
  getTopProjectById,
  updateTopProject,
  deleteTopProject,
  getAllTopProjects,
  // Add new category controller imports
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getGalleriesByCategory,
  getAllGalleries,
  getTopProjectsByCategory
} from "../controllers/AdminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Category routes - add these new routes
router.post("/categories", authMiddleware, adminMiddleware, createCategory);
router.get("/categories", authMiddleware, adminMiddleware, getAllCategories);
router.put("/categories/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

// Existing gallery routes
router.post("/gallery", authMiddleware, adminMiddleware, createGallery);
// Rute untuk mendapatkan semua galeri berdasarkan category_id
router.get('/galleries/category/:category_id', authMiddleware, adminMiddleware, getGalleriesByCategory);
router.put("/gallery/:id", authMiddleware, adminMiddleware, updateGallery);
router.get("/gallery/:id", authMiddleware, adminMiddleware, getGalleryById);
router.delete("/gallery/:id", authMiddleware, adminMiddleware, deleteGallery);
router.get("/galleries", authMiddleware, adminMiddleware, getAllGalleries);

// Existing top project routes
router.post("/top-project", authMiddleware, adminMiddleware, createTopProject);
// Rute untuk mendapatkan semua top projects berdasarkan category_id
router.get('/top-projects/category/:category_id', getTopProjectsByCategory);
router.get(
  "/top-project/:id",
  authMiddleware,
  adminMiddleware,
  getTopProjectById
);
router.put(
  "/top-project/:id",
  authMiddleware,
  adminMiddleware,
  updateTopProject
);
router.delete(
  "/top-project/:id",
  authMiddleware,
  adminMiddleware,
  deleteTopProject
);
router.get("/top-projects", authMiddleware, adminMiddleware, getAllTopProjects);

export default router;

// //routes/adminRoutes.js
// import express from "express";
// import {
//   createGallery,
//   updateGallery,
//   getGalleryById,
//   deleteGallery,
//   getAllGalleries,
//   createTopProject,
//   getTopProjectById,
//   updateTopProject,
//   deleteTopProject,
//   getAllTopProjects
// } from "../controllers/AdminController.js"; // Pastikan path ini benar
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // Rute untuk galeri
// router.post("/gallery", authMiddleware, adminMiddleware, createGallery);
// router.put("/gallery/:id", authMiddleware, adminMiddleware, updateGallery);
// router.get("/gallery/:id", authMiddleware, adminMiddleware, getGalleryById);
// router.delete("/gallery/:id", authMiddleware, adminMiddleware, deleteGallery);
// router.get("/galleries", authMiddleware, adminMiddleware, getAllGalleries);

// // Rute untuk proyek top
// router.post("/top-project", authMiddleware, adminMiddleware, createTopProject);
// router.get(
//   "/top-project/:id",
//   authMiddleware,
//   adminMiddleware,
//   getTopProjectById
// );
// router.put(
//   "/top-project/:id",
//   authMiddleware,
//   adminMiddleware,
//   updateTopProject
// );
// router.delete(
//   "/top-project/:id",
//   authMiddleware,
//   adminMiddleware,
//   deleteTopProject
// );
// router.get("/top-projects", authMiddleware, adminMiddleware, getAllTopProjects);

// export default router;
