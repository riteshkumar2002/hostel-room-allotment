import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  index: {
    type: Number,
    index: true,
    required: true,
    unique: true,
  },
  room_number: {
    type: String,
    index: true,
    required: true,
    unique: true
  },
  capacity: {
    type: Number
  },
  allocated_to: {
    type: [String]
  }
}, { _id: false });

const tableName = "Rooms";
const Room = mongoose.model(tableName, RoomSchema, tableName);

export default Room;
