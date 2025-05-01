import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SignUpSchema = new Schema({
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
  mob_no: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  adm_no: {
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

const SignUp = mongoose.model('SignUp', SignUpSchema);

export default SignUp;
