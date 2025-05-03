import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: false
    }
  },
  mobile_number: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admission_number: {
    type: String,
    required: true,
    unique: true 
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  }
});

const User = mongoose.model('user', UserSchema);

export default User;
