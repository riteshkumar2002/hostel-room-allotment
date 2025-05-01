import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  room_no: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number
  },
  allocated_to: {
    type: [String]
  }
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;
