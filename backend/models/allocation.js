import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
  admission_no: {
    type: String,
    ref: 'SignUp', // Reference to 'admission_no' in SignUp collection
    required: true,
    unique: true
  },
  room_number: {
    type: String,
    ref: 'Room', // Reference to 'room_no' in Room collection
    required: true
  }
});

const Allocation = mongoose.model('Allocation', AllocationSchema);

export default Allocation;
