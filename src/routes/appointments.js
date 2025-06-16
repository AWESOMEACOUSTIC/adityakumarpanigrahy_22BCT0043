import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { permit }     from '../middleware/roles.js';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';

import {
  appointmentRules,
  validateAppointment
} from '../middleware/appointmentValidator.js';

const router = express.Router();

router.use(ensureAuth);

// Anyone with a role can list or view
router.get(
  '/',
  permit('nurse','doctor','admin'),
  getAppointments
);

// Create only doctor or admin
router.post(
  '/',
  permit('doctor','admin'),
  appointmentRules,
  validateAppointment,
  createAppointment
);

// Update (status, notes) — doctor or admin
router.put(
  '/:id',
  permit('doctor','admin'),
  appointmentRules,
  validateAppointment,
  updateAppointment
);

// Delete — admin only
router.delete(
  '/:id',
  permit('admin'),
  deleteAppointment
);

export default router;
