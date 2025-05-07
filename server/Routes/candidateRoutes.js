import express from 'express';
import { createCandidate,getCandidates,updateCandidate ,deleteCandidate, promoteCandidate, getCandidateById} from '../Controller/candidateController.js';
import upload from '../middleware/upload.js';
import userAuth from '../middleware/auth.js';

const router = express.Router();

// Base route /api/candidates
router.post('/', userAuth,upload.single('resume'), createCandidate);
router.get('/',userAuth,getCandidates);
router.get("/:id",userAuth,getCandidateById)
router.put('/:id',userAuth,upload.single('resume'), updateCandidate);
router.delete('/:id', userAuth,deleteCandidate);
router.post('/promote/:id', userAuth,promoteCandidate);

export default router;
