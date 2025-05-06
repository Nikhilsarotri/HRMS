import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  department: String,
  experience: String,
  status: { type: String, default: 'Present' }
},
{
  versionKey:false,
  timestamps:true
});


const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
