import Room from '../../models/room.js'
import Constraint from '../../models/constraint.js';
export default async (req, res) => {
    try {
        const { startRoom, numOfRooms, ...rest } = req.body;

        const startRoomDetails = await Room.findOne({ room_no: startRoom });

        if (!startRoomDetails) {
            return res.status(404).json({ message: 'Start room not found' });
        }

        const startRoomIndex = startRoomDetails.index;
        const endRoomIndex = startRoomIndex + numOfRooms - 1;

        const endRoomDetails = await Room.findOne({ index: endRoomIndex });

        if (!endRoomDetails) {
            return res.status(404).json({ message: 'end room not found' });
        }

        const endRoomIndex = endRoomDetails.index;

        const conflictingConstraints = await Constraint.find({
            $or: [
                {
                    start_room_index: { $lte: endIndex },
                    end_room_index: { $gte: startIndex }
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
            ...rest,
            num_of_rooms: numOfRooms,
            start_room,
            end_room,
            start_room_index: startRoomIndex,
            end_room_index: endRoomIndex,
        };

        const new_constraint = await Constraint.create(newConstraintData);
        res.status(201).json(new_constraint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
}