import express from 'express';
import { getEmployees,getEmployeeById,updateEmployee, deleteEmployee,updateEmployeeAttendance} from '../Controller/employeeController.js';
import userAuth from '../middleware/auth.js';
const router = express.Router();
router.get('/', userAuth,getEmployees);
router.get('/:id',userAuth, getEmployeeById);
router.put('/:id',userAuth, updateEmployee);
router.delete('/:id', userAuth,deleteEmployee);
router.put("/attendance/:id",userAuth, updateEmployeeAttendance);

export default router;
