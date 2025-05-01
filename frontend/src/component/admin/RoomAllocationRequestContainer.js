import React from 'react';
import RoomAllocationRequestCard from './RoomAllocationRequestCard';

const RoomAllocationRequestContainer = ({ requests, onApprove, onReject }) => {
  return (
    <div style={styles.cardContainer}>
      {requests.map((request, index) => (
        <RoomAllocationRequestCard
          key={index}
          request={request}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center',
    padding: '1rem'
  }
};

export default RoomAllocationRequestContainer;
