import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};