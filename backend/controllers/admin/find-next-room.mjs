export default async (req, res) => {
    try {
        const start_room = req.query.start_room;
        const noOfRoom = parseInt(req.query.noOfRoom, 10);

        if (!start_room || isNaN(noOfRoom)) {
            return res.status(400).json({ message: 'Missing or invalid parameters' });
        }

        const startRoomDetails = await Room.findOne({ room_no: start_room });

        if (!startRoomDetails) {
            return res.status(404).json({ message: 'Start room not found' });
        }

        const startRoomIndex = startRoomDetails.index;
        const lastRoomIndex = startRoomIndex + noOfRoom - 1;

        const lastRoomDetails = await Room.findOne({ index: lastRoomIndex });

        if (!lastRoomDetails) {
            return res.status(404).json({ message: 'Next room not found' });
        }

        return res.status(200).json({ next_room_no: lastRoomDetails.room_no });
    } catch (error) {
        console.error('Error finding next room:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}