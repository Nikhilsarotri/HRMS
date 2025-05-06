import express from 'express';
import { requestLeave,getAllLeaves,getApprovedLeaves,updateLeaveStatus } from '../Controller/leaveController.js';
import { uploadDocument } from '../middleware/upload.js';
import userAuth from '../middleware/auth.js';

const router = express.Router();





router.post('/',userAuth, uploadDocument.single('document'), requestLeave);
router.get('/',userAuth, getAllLeaves);
router.get('/approved', userAuth,getApprovedLeaves);
router.put('/:id', userAuth,updateLeaveStatus);

export default router;

