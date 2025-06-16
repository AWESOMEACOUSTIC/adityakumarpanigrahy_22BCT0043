import express from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { permit }     from '../middleware/roles.js';
import {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord
} from '../controllers/recordController.js';
import {
  recordRules,
  validateRecord
} from '../middleware/recordValidator.js';

const router = express.Router({ mergeParams: true });

router.use(ensureAuth);

// GET    /api/patients/:id/records
router.get(
  '/',
  permit('doctor','nurse','admin'),
  getRecords
);

// POST   /api/patients/:id/records
router.post(
  '/',
  permit('doctor','nurse'),
  recordRules,
  validateRecord,
  createRecord
);

// PUT    /api/records/:recordId
router.put(
  '/:recordId',
  permit('doctor','nurse'),
  recordRules,
  validateRecord,
  updateRecord
);

// DELETE /api/records/:recordId
router.delete(
  '/:recordId',
  permit('admin'),
  deleteRecord
);

export default router;
