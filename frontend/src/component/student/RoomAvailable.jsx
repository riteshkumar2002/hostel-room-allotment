import React, { useState } from 'react';
import Student_Navbar from './Student_navbar';
import data from '../details';
import axios from 'axios';
import { API } from '../../config';

const RoomAvailable = () => {
  const [formValues, setFormValues] = useState({
    program: '',
    category: '',
    year: '',
    branch: ''
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Options
  const programOptions = data.programOptions;
  const categoryOptions = data.categoryOptions;
  const yearOptions = data.yearOptions;
  const branchOptions = data.branchOptions;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      ...(name === 'program' && { category: '', year: '', branch: '' }),
      ...(name === 'category' && { year: '', branch: '' }),
      ...(name === 'year' && { branch: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredRooms = [
      { room_number: 'C101', capacity: 2, occupied: 1 },
      { room_number: 'C102', capacity: 2, occupied: 0 },
      { room_number: 'B115', capacity: 2, occupied: 0 },
      { room_number: 'B114', capacity: 2, occupied: 1 },
      { room_number: 'C103', capacity: 2, occupied: 2 }
    ];
    setAvailableRooms(filteredRooms);
    setSelectedRooms([]);

    // Uncomment for real API:
    // try {
    //   const response = await axios.post(`${API}/api/user/check-available-rooms`, {
    //     program: formValues.program,
    //     category: formValues.category,
    //     year: formValues.year,
    //     branch: formValues.branch
    //   });
    //   setAvailableRooms(response.data.rooms || []);
    //   setSelectedRooms([]);
    // } catch (error) {
    //   console.error('Error fetching available rooms:', error);
    // }
  };

  const toggleRoomSelection = (roomNumber, isAvailable) => {
    if (!isAvailable) return;
    setSelectedRooms((prev) =>
      prev.includes(roomNumber)
        ? prev.filter((room) => room !== roomNumber)
        : [...prev, roomNumber]
    );
  };

  const availableCategories = formValues.program !== 'Doctoral'
    ? categoryOptions[formValues.program] || []
    : [];

  const availableYears =
    formValues.program === 'UG' && formValues.category === 'B.Tech.'
      ? yearOptions.BTech
      : formValues.program === 'UG' && availableCategories.includes(formValues.category)
        ? yearOptions.FiveYearPrograms
        : formValues.program === 'PG' && formValues.category === 'M.Sc.'
          ? yearOptions.msc
          : formValues.program === 'PG' && formValues.category === 'M.Tech.'
            ? yearOptions.mtech
            : formValues.program === 'PG' && formValues.category === 'MBA'
              ? yearOptions.mba
              : formValues.program === 'Doctoral'
                ? yearOptions.PhD
                : [];

  const getAvailableBranches = () => {
    if (formValues.program === 'UG') {
      if (formValues.category === 'B.Tech.') return branchOptions.btech;
      if (formValues.category === '5-year Integrated M.Tech.') return branchOptions.intmtech;
      if (formValues.category === 'Dual Degree') return branchOptions.dualdegree;
      if (formValues.category === 'Double Major') return branchOptions.doublemajor;
    } else if (formValues.program === 'PG') {
      if (formValues.category === 'M.Sc. (Tech)') return branchOptions.msc;
      if (formValues.category === 'M.Tech.') return branchOptions.mtech;
      if (formValues.category === 'MBA') return branchOptions.mba;
    }
    return [];
  };

  const availableBranches = getAvailableBranches();


  const [message, setMessage] = useState('');

// Handle selected room submission
const handleSubmitSelectedRooms = async () => {
  console.log(selectedRooms);
  try {
    const response = await axios.post(`${API}/api/user/allocation-request`, {
      roomNumbers: selectedRooms,
      admissionNumber:"20je0793"
    });

    setMessage('Rooms submitted successfully!');
    // Optionally reset selection
    setSelectedRooms([]);
  } catch (error) {
    console.error('Error submitting rooms:', error);
    setMessage('Error submitting rooms. Please try again.');
  }
};

  return (
    <>
      <Student_Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Check Available Rooms</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Program */}
          <label>
            Program:
            <select
              name="program"
              value={formValues.program}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="">Select Program</option>
              {programOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          {/* Category */}
          {formValues.program && formValues.program !== 'Doctoral' && (
            <label>
              Category:
              <select
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select Category</option>
                {availableCategories.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Year */}
          {(formValues.program === 'Doctoral' || formValues.category) && availableYears.length > 0 && (
            <label>
              Year:
              <select
                name="year"
                value={formValues.year}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select Year</option>
                {availableYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Branch */}
          {formValues.year && availableBranches.length > 0 && (
            <label>
              Branch:
              <select
                name="branch"
                value={formValues.branch}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="">Select Branch</option>
                {availableBranches.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </label>
          )}

          <button type="submit" style={styles.button}>
            Check Availability
          </button>
        </form>

        <div style={styles.roomList}>
          <h3>Available Rooms</h3>
          {availableRooms.length > 0 ? (
            <div style={styles.roomGrid}>
              {availableRooms.map((room) => {
                const isAvailable = room.capacity - room.occupied > 0;
                const isSelected = selectedRooms.includes(room.room_number);

                return (
                  <div key={room.room_number} style={styles.roomBoxContainer}>
                    <div
                      onClick={() => toggleRoomSelection(room.room_number, isAvailable)}
                      style={{
                        ...styles.roomBox,
                        backgroundColor: isSelected
                          ? 'blue'
                          : isAvailable
                            ? 'green'
                            : 'white',
                        color: isSelected || isAvailable ? 'white' : 'black',
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        opacity: isAvailable ? 1 : 0.5
                      }}
                    >
                      {room.room_number}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No available rooms match your criteria.</p>
          )}

{selectedRooms.length > 0 && (
  <div style={{ marginTop: '1rem' }}>
    <h4>Selected Rooms:</h4>
    <ul>
      {selectedRooms.map((room, index) => (
        <li key={index}>{room}</li>
      ))}
    </ul>
    <button
      onClick={handleSubmitSelectedRooms}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1.5rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Submit Selection
    </button>
    {message && (
      <p style={{ marginTop: '0.5rem', color: message.includes('successfully') ? 'green' : 'red' }}>
        {message}
      </p>
    )}
  </div>
)}
        </div>
      </div>
    </>
  );
};

// CSS-in-JS
const styles = {
  roomGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  roomBoxContainer: {
    margin: '0.5rem'
  },
  roomBox: {
    width: "56px",
    height: "56px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ccc',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  },
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
    marginBottom: '2rem'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem 2rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  roomList: {
    marginTop: '2rem',
    textAlign: 'center'
  }
};

export default RoomAvailable;
