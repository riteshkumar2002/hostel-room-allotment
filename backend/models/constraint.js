import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ConstraintSchema = new Schema({
  number_of_rooms: {
    type: Number,
    required: true
  },
  start_room_number: {
    type: String,
    required: true
  },
  start_room_index: {
    type: Number,
    required: true
  },
  end_room_number: {
    type: String,
    required: true
  },
  end_room_index: {
    type: Number,
    required: true
  },
  program: {
    type: String,
    enum: ['ug', 'pg', 'doctoral'],
    required: true
  },
  year: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  }
}, {
  _id: true
});

const Constraint = mongoose.model('Constraint', ConstraintSchema);

export default Constraint;
