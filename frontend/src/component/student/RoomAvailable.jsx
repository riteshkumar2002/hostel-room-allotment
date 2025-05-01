import React, { useState } from 'react';
import Student_Navbar from './Student_navbar';

const RoomAvailable = () => {
  const [formValues, setFormValues] = useState({
    program: '',
    category: '',
    year: '',
    branch: ''
  });
  const [availableRooms, setAvailableRooms] = useState([]);

  // Options
  const programOptions = ['UG', 'PG', 'Doctoral'];
  const categoryOptions = {
    UG: ['B.Tech.', '5-year Integrated M.Tech.', 'Dual Degree', 'Double Major'],
    PG: ['M.Sc. (Tech)', 'M.Tech.', 'MBA']
  };
  const yearOptions = {
    BTech: [1, 2, 3, 4],
    FiveYearPrograms: [1, 2, 3, 4, 5],
    PG: [1, 2, 3],
    PhD: [1, 2, 3, 4, 5, 6, 7, 8]
  };
  const branchOptions = {
    UG: ['CSE', 'M&C', 'ECE', 'EE', 'PE', 'Mining Engineering', 'Civil', 'FME']
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredRooms = [
      { id: 1, hostelName: 'Hostel A', roomNo: '101', status: 'Available', applied: false },
      { id: 2, hostelName: 'Hostel B', roomNo: '202', status: 'Partial Available', applied: false },
      { id: 3, hostelName: 'Hostel C', roomNo: '303', status: 'Occupied' }
    ];
    setAvailableRooms(filteredRooms);
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
      : formValues.program === 'PG'
      ? yearOptions.PG
      : formValues.program === 'Doctoral'
      ? yearOptions.PhD
      : [];

  const availableBranches = formValues.program === 'UG' ? branchOptions.UG : [];

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
          {formValues.year && formValues.program === 'UG' && (
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
