import { body, validationResult } from 'express-validator';

export const patientValidationRules = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name must contain only letters'),
  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name must contain only letters'),
  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().toDate().withMessage('Date of birth must be a valid date'),
  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['male','female','other']).withMessage('Gender must be one of male, female, other'),
  body('contactInfo.phone')
    .optional()
    .isMobilePhone().withMessage('Phone must be a valid mobile number'),
  body('contactInfo.email')
    .optional()
    .isEmail().withMessage('Email must be valid'),
  body('contactInfo.address')
    .optional()
    .isLength({ max: 200 }).withMessage('Address too long'),
];

export const validatePatient = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
