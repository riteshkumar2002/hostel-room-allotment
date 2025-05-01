import React, { useState } from 'react';
import Student_Navbar from './Student_navbar';

const RoomChangeRequest = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    admissionNo: '',
    branch: '',
    year: '',
    currentRoom: '',
    requestedRoom: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room Change Request Submitted:', formValues);
    alert('Room change request submitted successfully!');
    // Here, you can add logic to send the form data to a server or API.
    setFormValues({
      name: '',
      admissionNo: '',
      branch: '',
      year: '',
      currentRoom: '',
      requestedRoom: ''
    });
  };

  return (
    <>
      <Student_Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Room Change Request</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              style={styles.input}
              required
            />
          </label>

          {/* Admission No. */}
          <label>
            Admission No.:
            <input
              type="text"
              name="admissionNo"
              value={formValues.admissionNo}
              onChange={handleInputChange}
              placeholder="Enter your admission number"
              style={styles.input}
              required
            />
          </label>

          {/* Branch */}
          <label>
            Branch:
            <select
              name="branch"
              value={formValues.branch}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="M&C">M&C</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="PE">PE</option>
              <option value="Mining Engineering">Mining Engineering</option>
              <option value="Civil">Civil</option>
              <option value="FME">FME</option>
            </select>
          </label>

          {/* Year */}
          <label>
            Year:
            <select
              name="year"
              value={formValues.year}
              onChange={handleInputChange}
              style={styles.input}
              required
            >
              <option value="">Select Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          {/* Current Room */}
          <label>
            Current Room:
            <input
              type="text"
              name="currentRoom"
              value={formValues.currentRoom}
              onChange={handleInputChange}
              placeholder="Enter your current room number"
              style={styles.input}
              required
            />
          </label>

          {/* Requested Room */}
          <label>
            Requested Room:
            <input
              type="text"
              name="requestedRoom"
              value={formValues.requestedRoom}
              onChange={handleInputChange}
              placeholder="Enter your requested room number"
              style={styles.input}
              required
            />
          </label>

          <button type="submit" style={styles.button}>
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

// CSS-in-JS styles
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
  }
};

export default RoomChangeRequest;
