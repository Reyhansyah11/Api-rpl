// routes/topProject.js
import express from 'express';
import TopProjectController from '../controllers/TopProjectController.js';

const router = express.Router();
const topProjectController = new TopProjectController();

// Get all top projects (with their categories)
router.get('/', topProjectController.getAllTopProjects);

// Get top projects by category ID
router.get('/category/:categoryId', topProjectController.getTopProjectsByCategory);

// Get a specific top project by ID (with its category)
router.get('/:id', topProjectController.getTopProjectById);

export default router;

// router.post('/top-project', topProjectController.createTopProject);
// router.put('/:id', topProjectController.updateTopProject);
// router.delete('/:id', topProjectController.deleteTopProject);