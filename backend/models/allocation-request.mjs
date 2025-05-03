import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AllocationRequestSchema = new Schema({
  admission_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  room_numbers: {
    type: [String],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const AllocationRequest = mongoose.model('allocationrequest', AllocationRequestSchema);

export default AllocationRequest;
