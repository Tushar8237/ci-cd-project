import express from 'express';
import { addMasterClass, deleteMasterClass, getAllMasterClass, getMasterClass, updateMasterClass } from '../controllers/masterClass.controllers.js';
import checkRole from '../middlewares/isAdmin.js';
import validation from '../middlewares/validation.middleware.js';
import { masterClassSchema } from '../validation/masterClass.validation.js';
import verifyUser from './../middlewares/verify.token.js';

const router = express.Router();

// Add master class
router.post('/master-class', verifyUser, checkRole('admin'), validation(masterClassSchema), addMasterClass);

// Get master class
router.get('/master-class/:id', verifyUser, getMasterClass);

// Get All master class
router.get('/master-class', verifyUser, getAllMasterClass);

// Get All master class
router.put('/update-master-class/:id', verifyUser, checkRole('admin'), updateMasterClass);

// Get All master class
router.delete('/delete-master-class/:id', verifyUser, checkRole('admin'), deleteMasterClass);

export default router