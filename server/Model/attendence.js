import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    required: true,
  },
  task: {
    type: String,
    default: 'Working on Frontend'
  }
}, 
  {
    versionKey:false,
    timestamps:true
  });
  

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
