import React, { useState } from 'react';
import axios from 'axios';
import Admin_Navbar from './Admin_navbar';
import { API } from '../../config';

const Deallocate = () => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    admissionNo: '',
    program: '',
    branch: '',
    roomNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
          const response = await axios.delete(`${API}/admin/deallocate-room`, {
              data: { admissionNo: formData.admissionNo }
          });

          console.log('Room Deallocated:', response.data);
          alert('Room deallocated successfully');

          setFormData({
              name: '',
              year: '',
              admissionNo: '',
              program: '',
              branch: '',
              roomNo: ''
          });
      } catch (error) {
          console.error('Error deallocating room:', error.response?.data || error);
          alert('Failed to deallocate room');
      }
  };

  return (
    <>
    <Admin_Navbar/>
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Deallocate Room</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Year:</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Admission No.:</label>
          <input
            type="text"
            name="admissionNo"
            value={formData.admissionNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Program:</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Room No.:</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g., C-150"
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>Deallocate Room</button>
      </form>
    </div>
    </>
  );
};

const styles = {
  formContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '1rem',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.5rem',
    display: 'block'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '100%'
  },
  submitButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '0.7rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
};

export default Deallocate;
