import express from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, loginEmployee, updateEmployee } from '../controllers/employee.controller.js';

const router = express.Router();

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.post('/login', loginEmployee); 

export default router;