import Appointment from '../models/Appointment.js';

// List (optionally filter by doctor, patient, or date)
export const getAppointments = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.doctor)  filters.doctor  = req.query.doctor;
    if (req.query.patient) filters.patient = req.query.patient;
    if (req.query.date)    filters.date    = new Date(req.query.date);

    const appts = await Appointment.find(filters)
      .populate('patient','firstName lastName')
      .populate('doctor','name email');
    res.json(appts);
  } catch (err) {
    next(err);
  }
};

// Create
export const createAppointment = async (req, res, next) => {
  try {
    const appt = await Appointment.create(req.body);
    res.status(201).json(appt);
  } catch (err) {
    next(err);
  }
};

// Update (date, status, notes)
export const updateAppointment = async (req, res, next) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteAppointment = async (req, res, next) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    next(err);
  }
};
