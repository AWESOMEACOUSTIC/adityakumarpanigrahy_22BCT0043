import { body, validationResult } from 'express-validator';

export const recordRules = [
  body('visitDate')
    .optional()
    .isISO8601().toDate().withMessage('visitDate must be a valid date'),
  body('diagnosis')
    .notEmpty().withMessage('Diagnosis is required')
    .isLength({ max: 500 }).withMessage('Diagnosis too long'),
  body('treatment')
    .optional()
    .isLength({ max: 500 }).withMessage('Treatment too long'),
  body('attachments')
    .optional()
    .isArray().withMessage('Attachments must be an array of URLs')
    .custom(arr => arr.every(u => typeof u === 'string'))
    .withMessage('Each attachment must be a URL string'),
];

export const validateRecord = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
