import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  leaveDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  
  documentUrl: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Leave', leaveSchema);
