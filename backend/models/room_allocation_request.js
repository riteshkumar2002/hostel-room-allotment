import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomAllocationRequestSchema = new Schema({
  admission_no: {
    type: String,
    required: true,
    ref: 'SignUp' // Reference to SignUp model
  },
  room_no: {
    type: String,
    required: true,
    ref: 'Room' // Reference to Room model
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const RoomAllocationRequest = mongoose.model('RoomAllocationRequest', RoomAllocationRequestSchema);

export default RoomAllocationRequest;
