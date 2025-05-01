
export default async (req, res) => {
    try {
        const { start_room, end_room, ...rest } = req.body;

        const startRoom = await Room.findOne({ room_no: start_room });
        const endRoom = await Room.findOne({ room_no: end_room });

        if (!startRoom || !endRoom) {
            return res.status(404).json({ error: 'Start or End room not found' });
        }

        const startIndex = startRoom.index;
        const endIndex = endRoom.index;

        if (startIndex > endIndex) {
            return res.status(400).json({ error: 'Start room must be before End room' });
        }

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
            start_room,
            end_room,
            start_room_index: startIndex,
            end_room_index: endIndex
        };

        const new_constraint = await Constraint.create(newConstraintData);
        res.status(201).json(new_constraint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
}