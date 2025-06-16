import Patient from '../models/Patient.js';

export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    next(err);
  }
};

export const createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    next(err);
  }
};

export default { getAllPatients, createPatient, updatePatient, deletePatient };