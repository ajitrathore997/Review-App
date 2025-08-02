import express from 'express';
import dealController from '../controllers/dealController.js';

const { fetchDeals, fetchAssignees, fetchStages } = dealController;


const router = express.Router();

router.get('/deals', fetchDeals);
router.get('/assignees', fetchAssignees);
router.get('/stages', fetchStages);

export default router;
