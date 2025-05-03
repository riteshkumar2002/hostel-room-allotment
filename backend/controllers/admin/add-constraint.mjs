import Room from '../../models/room.js'
import Constraint from '../../models/constraint.js';
export default async (req, res) => {
    try {
        const startRoomNumber = req.body.startRoomNumber;
        const numberOfRooms = Number(req.body.numberOfRooms);

        const startRoom = await Room.findOne({ room_number: startRoomNumber });

        if (!startRoom) {
            return res.status(404).json({ message: 'Start room not found' });
        }

        const startRoomIndex = startRoom.index;
        const endRoomIndex = startRoomIndex + numberOfRooms - 1;

        const endRoom = await Room.findOne({ index: endRoomIndex });

        if (!endRoom) {
            return res.status(404).json({ message: 'end room not found' });
        }

        const conflictingConstraints = await Constraint.find({
            $or: [
                {
                    start_room_index: { $lte: endRoomIndex },
                    end_room_index: { $gte: startRoomIndex }
                }
            ]
        });

        if (conflictingConstraints.length > 0) {
            return res.status(409).json({
                error: 'This room range conflicts with existing constraints',
                conflicts: conflictingConstraints
            });
        }

        const newConstraintData = {
            number_of_rooms: numberOfRooms,
            start_room_number: startRoomNumber,
            start_room_index: startRoomIndex,
            end_room_number: endRoom.room_number,
            end_room_index: endRoomIndex,
            program: req.body.program,
            branch: req.body.branch,
            year: req.body.year
        };

        const new_constraint = await Constraint.create(newConstraintData);
        res.status(201).json(new_constraint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
}