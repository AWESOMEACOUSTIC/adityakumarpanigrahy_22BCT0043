import express from 'express';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import './config/passport.js';
import authRouter from './routes/auth.js';
import patientsRouter from './routes/patients.js';
import appointmentsRouter from './routes/appointments.js';
import recordsRouter from './routes/records.js';

const app = express();
connectDB();

app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Route registration
app.use('/api/auth', authRouter);
app.use('/api/patients', patientsRouter);

app.use('/api/patients/:id/records', recordsRouter);

app.use('/api/appointments', appointmentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));