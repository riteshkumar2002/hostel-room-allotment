import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
  admission_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  room_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  }
});

const Allocation = mongoose.model('Allocation', AllocationSchema);

export default Allocation;
