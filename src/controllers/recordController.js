import Record from '../models/Record.js';

// List all records for a patient
export const getRecords = async (req, res, next) => {
  try {
    const { id: patientId } = req.params;
    const records = await Record.find({ patient: patientId })
      .populate('author','name email')
      .sort('-visitDate');
    res.json(records);
  } catch (err) {
    next(err);
  }
};

// Create a new record for a patient
export const createRecord = async (req, res, next) => {
  try {
    const { id: patientId } = req.params;
    const author = req.user.id;
    const rec = await Record.create({
      patient:    patientId,
      author,
      visitDate:  req.body.visitDate,
      diagnosis:  req.body.diagnosis,
      treatment:  req.body.treatment,
      attachments:req.body.attachments
    });
    res.status(201).json(rec);
  } catch (err) {
    next(err);
  }
};

// Update an existing record
export const updateRecord = async (req, res, next) => {
  try {
    const rec = await Record.findByIdAndUpdate(
      req.params.recordId,
      req.body,
      { new: true }
    );
    if (!rec) return res.status(404).json({ message: 'Record not found' });
    res.json(rec);
  } catch (err) {
    next(err);
  }
};

// Delete a record
export const deleteRecord = async (req, res, next) => {
  try {
    const rec = await Record.findByIdAndDelete(req.params.recordId);
    if (!rec) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (err) {
    next(err);
  }
};
