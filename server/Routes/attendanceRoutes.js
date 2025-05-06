import express from 'express';
import { markAttendance,getAttendance, getAttendanceById,updateAttendance,updateAttendance ,deleteAttendance,getAttendanceByEmployee} from '../Controller/attendanceController';
import userAuth from '../middleware/auth';
const router = express.Router();


router.post('/',userAuth, markAttendance);
router.get('/',userAuth, getAttendance);


router.get('/:id',userAuth, getAttendanceById);
router.put('/:id', userAuth,updateAttendance);
router.delete('/:id', userAuth,deleteAttendance);

router.get('/employee/:employeeId',userAuth, getAttendanceByEmployee);

export default router
