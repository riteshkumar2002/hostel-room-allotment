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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const filteredRooms = [
      { id: 1, hostelName: 'Hostel A', roomNo: '101', status: 'Available', applied: false },
      { id: 2, hostelName: 'Hostel B', roomNo: '202', status: 'Partial Available', applied: false },
      { id: 3, hostelName: 'Hostel C', roomNo: '303', status: 'Occupied' }
    ];
    setAvailableRooms(filteredRooms);

    // try {
    //   const response = await axios.post(`${API}/api/user/check-available-rooms`, {
    //     program: formValues.program,
    //     category: formValues.category,
    //     year: formValues.year,
    //     branch: formValues.branch
    //   });
  
    //   // Replace with actual response structure
    //   setAvailableRooms(response.data.rooms || []);
    // } catch (error) {
    //   console.error('Error fetching available rooms:', error);
    // }
  };

  const handleApply = (roomId) => {
    setAvailableRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, applied: true } : room
      )
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

          {/* Category - only shown if program isn't Doctoral */}
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

          {/* Year - shown if category selected or program is Doctoral */}
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

          {/* Branch - only if UG program */}
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
            <div style={styles.cardContainer}>
              {availableRooms.map((room) => (
                <div key={room.id} style={styles.roomCard}>
                  <p><strong>Hostel:</strong> {room.hostelName}</p>
                  <p><strong>Room No:</strong> {room.roomNo}</p>
                  <p><strong>Status:</strong> {room.status}</p>
                  {(room.status === 'Available' || room.status === 'Partial Available') && (
                    <button
                      onClick={() => handleApply(room.id)}
                      style={{
                        ...styles.applyButton,
                        backgroundColor: room.applied ? 'green' : 'red'
                      }}
                      disabled={room.applied}
                    >
                      {room.applied ? 'Applied' : 'Apply'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No available rooms match your criteria.</p>
          )}
        </div>
      </div>
    </>
  );
};

// CSS-in-JS
const styles = {
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
  },
  cardContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  roomCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1rem',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  applyButton: {
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '0.5rem'
  }
};

export default RoomAvailable;
