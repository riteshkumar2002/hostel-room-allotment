import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../config';
import data from '../details';

const RoomConstraint = () => {
  const hostelName = 'Jasper Hostel'; // Fixed hostel name
  const [rules, setRules] = useState([
    { number: 15, block: 'A', startRoom: 102, endRoom: 225, program: 'ug', year: 'Freshmen', branch: 'CSE' },
    { number: 35, block: 'C', startRoom: 102, endRoom: 225, program: 'ug', year: 'Sophomores', branch: 'ECE' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newRule, setNewRule] = useState({ number: '', startRoom: '', program: '', year: '', branch: '' });

  useEffect(() => {
    axios.get(`${API}/api/admin/get-constraints`)
      .then((response) => {
        // setRules(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const blocks = [
    { name: 'A', floors: 3, roomsPerFloor: 10 },
    { name: 'B', floors: 3, roomsPerFloor: 10 },
    { name: 'C', floors: 3, roomsPerFloor: 10 },
  ];



  const addNewRule = async () => {
    try {
      const response = await axios.post(`${API}/api/admin/add-constraint`, newRule);

      if (response.status === 200) {
        setRules([...rules, response.data]);
        setNewRule({ number: '', startRoom: '', program: '', year: '', branch: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding new rule:', error);
    }
  };


  const deleteRule = async (ruleId) => {
    try {
      const response = await axios.delete(`${API}/api/admin/delete-constraint/${ruleId}`);
      if (response.status === 200) {
        setRules(rules.filter(rule => rule._id !== ruleId));
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  const isRoomAllocated = (block, floor, room) => {
    return rules.some(rule => rule.block === block &&
      floor * 100 + room >= rule.startRoom &&
      floor * 100 + room <= rule.endRoom);
  };
  const blockOptions = data.blocks;
  const programOptions = data.programOptions;
  const branchOptions = data.branchOptions.btech;
  const yearOptions = data.yearOptions;


  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.hostelName}>{hostelName}</h1>
        <h2 style={styles.title}>Room Allocation Constraints</h2>
        <button onClick={() => setShowForm(true)} style={{ ...styles.button, ...styles.addButton }}>Add New Rule</button>
        {showForm && (
          <div style={styles.formContainer}>
            <h3>New Rule</h3>
            <input type="number" placeholder="No. of Students" value={newRule.number} onChange={(e) => setNewRule({ ...newRule, number: e.target.value })} />
            <select
              value={newRule.block}
              onChange={(e) => setNewRule({ ...newRule, block: e.target.value })}
            >
              <option value="">Select Block</option>
              {blockOptions.map((block) => (
                <option key={block} value={block}>{block}</option>
              ))}
            </select>
            <input type="number" placeholder="Start Room" value={newRule.startRoom} onChange={(e) => setNewRule({ ...newRule, startRoom: e.target.value })} />
            <select
              value={newRule.program}
              onChange={(e) => setNewRule({ ...newRule, program: e.target.value, year: '' })}
            >
              <option value="">Select Program</option>
              {programOptions.map((prog) => (
                <option key={prog} value={prog.toLowerCase()}>{prog}</option>
              ))}
            </select>
            <select
              value={newRule.year}
              onChange={(e) => setNewRule({ ...newRule, year: e.target.value })}
              // disabled={!newRule.program}
            >
              <option value="">Select Year</option>
              {(yearOptions[newRule.program?.toUpperCase()] || []).map((yr) => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>

            {/* Branch Dropdown */}
            <select
              value={newRule.branch}
              onChange={(e) => setNewRule({ ...newRule, branch: e.target.value })}
            >
              <option value="">Select Branch</option>
              {branchOptions.map((br) => (
                <option key={br} value={br}>{br}</option>
              ))}
            </select>
            <button onClick={addNewRule} style={styles.button}>Save Rule</button>
            <button onClick={() => setShowForm(false)} style={styles.button}>Cancel</button>
          </div>
        )}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.headerCell}>No. of Students</th>
              <th style={styles.headerCell}>Room Range</th>
              <th style={styles.headerCell}>Program</th>
              <th style={styles.headerCell}>Year</th>
              <th style={styles.headerCell}>Branch</th>
              <th style={styles.headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{rule.number}</td>
                <td style={styles.cell}>{rule.startRoom} to {rule.endRoom}</td>
                <td style={styles.cell}>{rule.program}</td>
                <td style={styles.cell}>{rule.year}</td>
                <td style={styles.cell}>{rule.branch}</td>
                <td style={styles.cell}>
                  <button onClick={() => deleteRule(index)} style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div style={styles.roomsContainer}>
          {blocks.map((block) => (
            <div key={block.name} style={styles.block}>
              <h3 style={styles.blockTitle}>Block {block.name}</h3>
              {[...Array(block.floors)].map((_, floorIndex) => (
                <div key={floorIndex} style={styles.floor}>
                  <h4 style={styles.floorTitle}>Floor {floorIndex}</h4>
                  <div style={styles.roomsRow}>
                    {[...Array(block.roomsPerFloor)].map((_, roomIndex) => {
                      const roomNumber = floorIndex * 100 + roomIndex;
                      return (
                        <div
                          key={roomNumber}
                          style={{
                            ...styles.room,
                            backgroundColor: isRoomAllocated(block.name, floorIndex, roomNumber) ? 'green' : 'white',
                          }}
                        >
                          {roomNumber}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div> */}
      </div>

    </>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    padding: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: 'auto'
  },
  hostelName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#333'
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.25rem',
    fontWeight: '600'
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '0.4rem 0.8rem',
    margin: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  addButton: {
    display: 'block',
    margin: '0 auto 1rem'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: '0.3rem 0.5rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem'
  },
  headerCell: {
    borderBottom: '2px solid #ddd',
    padding: '0.5rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#555'
  },
  row: {
    backgroundColor: '#f9f9f9'
  },
  cell: {
    padding: '0.4rem',
    border: '1px solid #ddd',
    fontSize: '0.85rem',
    color: '#333',
    textAlign: 'center'
  },
  input: {
    width: '50%',
    padding: '0.3rem',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '0.85rem',
    textAlign: 'center'
  },
  roomsContainer: {
    marginTop: '2rem'
  },
  block: {
    marginBottom: '1.5rem'
  },
  blockTitle: {
    color: '#333',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '0.5rem'
  },
  floor: {
    marginBottom: '1rem'
  },
  floorTitle: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '0.5rem'
  },
  roomsRow: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  room: {
    width: '40px',
    height: '40px',
    margin: '0.2rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem'
  }
};
export default RoomConstraint;