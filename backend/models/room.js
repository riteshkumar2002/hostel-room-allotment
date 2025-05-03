import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  _id: {
    type: Number,
    index: true,
    required: true,
    unique: true,
  },
  room_number: {
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
