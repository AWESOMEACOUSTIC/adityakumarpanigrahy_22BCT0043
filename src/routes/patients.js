import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { permit } from '../middleware/roles.js';
import patientController from '../controllers/patientController.js';

const router = express.Router();

// Require authentication for all patient routes
router.use(ensureAuth);

// GET   /api/patients        – view all (nurse, doctor, admin)
router.get(
  '/',
  permit('nurse', 'doctor', 'admin'),
  patientController.getAllPatients
);

// POST  /api/patients        – create new (doctor, nurse, admin)
router.post(
  '/',
  permit('doctor', 'nurse', 'admin'),
  patientController.createPatient
);

// PUT   /api/patients/:id    – update existing (doctor, nurse, admin)
router.put(
  '/:id',
  permit('doctor', 'nurse', 'admin'),
  patientController.updatePatient
);

// DELETE /api/patients/:id   – delete patient (doctor, admin)
router.delete(
  '/:id',
  permit('doctor', 'admin'),
  patientController.deletePatient
);

export default router;
