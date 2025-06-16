import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  visitDate: {
    type: Date,
    default: Date.now,
  },
  diagnosis: {
    type: String,
    trim: true,
  },
  treatment: {
    type: String,
    trim: true,
  },
  attachments: [{
    type: String, // URL to scan, lab report, etc.
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Record', RecordSchema);
