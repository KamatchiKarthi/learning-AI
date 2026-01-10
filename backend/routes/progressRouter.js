import express from 'express';
import protect from '../middleware/auth.js';
import { getDashboard } from '../controller/progressController.js';

const ProgressRouter = express.Router();

ProgressRouter.use(protect);

ProgressRouter.get('/dashboard', getDashboard);

export default ProgressRouter;
