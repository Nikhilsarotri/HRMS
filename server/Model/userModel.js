import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  
  role: {
    type: String,
    default: 'HR'
  },
  profileImage: {
    url: String,
    publicId: String
  },
  token: {
    type: String,
  },
},
{
  versionKey: false,
  timestamps: true
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
