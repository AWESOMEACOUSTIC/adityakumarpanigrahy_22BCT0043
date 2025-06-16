import express from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();


const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin','doctor','nurse']).withMessage('Invalid role'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];


router.post('/register', registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  registerUser(req, res, next);
});


router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, passport.authenticate('local'), (req, res) => {
  res.json({
    message: 'Login successful',
    user: { id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role },
  });
});


router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: 'Logged out' });
  });
});

export default router;