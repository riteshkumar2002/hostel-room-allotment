import React from 'react';

const RoomAllocationRequestCard = ({ request, onApprove, onReject }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.heading}>{request.name}</h3>
      <p style={styles.paragraph}><strong>Admission No:</strong> {request.admissionNo}</p>
      <p style={styles.paragraph}><strong>Branch:</strong> {request.branch}</p>
      <div style={styles.buttonGroup}>
        <button
          style={styles.approveButton}
          onClick={() => onApprove(request)}
        >
          Approve
        </button>
        <button
          style={styles.rejectButton}
          onClick={() => onReject(request)}
        >
          Not Approve
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    width: '250px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    margin: '1rem'
  },
  heading: {
    color: '#333',
    marginBottom: '0.5rem'
  },
  paragraph: {
    color: '#555',
    margin: '0.5rem 0'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default RoomAllocationRequestCard;
