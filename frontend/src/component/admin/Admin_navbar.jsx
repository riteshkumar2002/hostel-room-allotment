import React from 'react';

const Admin_Navbar = () => {
  return (
    <nav style={navbarStyle} aria-label="Main Navigation">
      <div style={logoContainerStyle}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/IIT_%28ISM%29_Dhanbad_Logo.svg/1200px-IIT_%28ISM%29_Dhanbad_Logo.svg.png"
          alt="Logo"
          style={logoStyle}
        />
      </div>
      <ul style={navLinksStyle}>
        <li><a href="/" style={linkStyle}>Home</a></li>
        <li><a href="/room-constraints" style={linkStyle}>Add Constraint</a></li>
        <li><a href="/allocate" style={linkStyle}>Allocate</a></li>
        <li><a href="/Deallocate" style={linkStyle}>Deallocate</a></li>
        <li><a href="/room-allocation-request" style={linkStyle}>Requests</a></li>
      </ul>
    </nav>
  );
};

// Inline Styles
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#333',
  padding: '1rem 2rem'
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoStyle = {
  height: '40px', // Adjust height for the logo image
  width: 'auto', // Maintain aspect ratio
  filter: 'brightness(0) invert(1)', // Applies the white color effect
};

const navLinksStyle = {
  listStyle: 'none',
  display: 'flex',
  gap: '1.5rem'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s',
};

const linkHoverStyle = {
  color: '#ffa500'
};

export default Admin_Navbar;
