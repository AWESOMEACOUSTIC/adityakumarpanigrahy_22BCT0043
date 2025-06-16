import { body, validationResult } from 'express-validator';

export const appointmentRules = [
  body('patient').isMongoId().withMessage('Valid patient ID required'),
  body('doctor').isMongoId().withMessage('Valid doctor ID required'),
  body('date').isISO8601().toDate().withMessage('Valid date required'),
  body('status')
    .optional()
    .isIn(['scheduled','completed','cancelled'])
    .withMessage('Invalid status'),
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes too long')
];

export const validateAppointment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
