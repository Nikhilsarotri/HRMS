import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique:true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'New'
  },
  resume: {
    type: String, required: true 
  }
}, {
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Candidate', candidateSchema);
