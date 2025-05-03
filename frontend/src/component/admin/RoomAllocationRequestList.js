import React, { useEffect, useState } from 'react';
import Admin_Navbar from './Admin_navbar';
import RoomAllocationRequestContainer from './RoomAllocationRequestContainer';
import axios from 'axios';
import { API } from '../../config';

const RoomAllocationRequest = () => {
  const [requests, setRequests] = useState([
    { name: 'John Doe', admissionNo: '12345', branch: 'CSE', roomNo: 'A-101' },
    { name: 'Jane Smith', admissionNo: '67890', branch: 'ECE', roomNo: 'B-202' },
    { name: 'Mike Johnson', admissionNo: '54321', branch: 'ME', roomNo: 'C-303' },
    { name: 'Emily Davis', admissionNo: '11223', branch: 'CE', roomNo: 'D-404' },
    { name: 'Chris Evans', admissionNo: '44556', branch: 'EE', roomNo: 'E-505' },
    { name: 'Sarah Brown', admissionNo: '77889', branch: 'BT', roomNo: 'F-606' },
    { name: 'David Wilson', admissionNo: '99001', branch: 'CH', roomNo: 'G-707' },
    { name: 'Laura Thompson', admissionNo: '22334', branch: 'MT', roomNo: 'H-808' },
    { name: 'Peter Anderson', admissionNo: '55667', branch: 'PH', roomNo: 'I-909' }
  ]);


  useEffect(() => {
    axios.get(`${API}/api/admin/get-all-request`)
      .then(response => {
        // setRequests(response.data);
        console.log('Data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const handleApprove = (request) => {
    axios.post(`${API}/api/admin/`, {
      requestId: request.id,   
      status: 'approved'
    })
    .then(response => {
      console.log('Request approved:', response.data);
    })
    .catch(error => {
      console.error('Error approving request:', error);
    });
  };
  const handleReject = (request) => {
    console.log('Not Approved:', request);
  };

  const handleApproveAll = () => {
    requests.forEach(request => {
      console.log('Approved:', request);
    });

    setRequests([]);
  };

  const handleRejectAll = () => {
    requests.forEach(request => {
      console.log('Not Approved:', request);
    });

    setRequests([]);
  };

  return (
    <>
      <Admin_Navbar />
      <div style={styles.requestListContainer}>
        <h1 style={styles.requestListTitle}>Requested Room List</h1>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>Name</th>
              <th style={styles.headerCell}>Admission No</th>
              <th style={styles.headerCell}>Branch</th>
              <th style={styles.headerCell}>Room No</th>
              <th style={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{request.name}</td>
                <td style={styles.cell}>{request.admissionNo}</td>
                <td style={styles.cell}>{request.branch}</td>
                <td style={styles.cell}>{request.roomNo}</td>
                <td style={styles.cell}>
                  <button
                    onClick={() => handleApprove(request)}
                    style={{ ...styles.button, ...styles.approveButton }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request)}
                    style={{ ...styles.button, ...styles.rejectButton }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.actionButtons}>
          <button onClick={handleApproveAll} style={{ ...styles.button, ...styles.approveAllButton }}>
            Approve All
          </button>
          <button onClick={handleRejectAll} style={{ ...styles.button, ...styles.rejectAllButton }}>
            Reject All
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  requestListContainer: {
    padding: '2rem',
    textAlign: 'center'
  },
  requestListTitle: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem'
  },
  table: {
    width: '80%',
    margin: '0 auto',
    borderCollapse: 'collapse',
  },
  headerCell: {
    padding: '0.5rem',
    borderBottom: '2px solid #ddd',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
  row: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    fontSize: '0.9rem',
    color: '#555',
    textAlign: 'center'
  },
  button: {
    margin: '0.2rem',
    padding: '0.4rem 0.8rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none'
  },
  approveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  rejectButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
  actionButtons: {
    marginTop: '1rem',
  },
  approveAllButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    marginRight: '0.5rem'
  },
  rejectAllButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.6rem 1.2rem',
    fontSize: '1rem'
  }
};

export default RoomAllocationRequest;
