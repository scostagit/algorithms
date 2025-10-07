
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

   const styles = {
    height: '100%',  
    padding: '20px',
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    border: '1px solid #ccc',
    marginTop: '10px',
  };


  return (
    <div style={styles}>      
      <h1>Ranking Web App</h1> 
       <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>      
      {/* Shared UI like header, navbar etc. */}
      <Outlet /> {/* Page-specific content goes here */}
    </div>
  );
};

export default Layout;
