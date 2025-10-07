
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const styles = {
    padding: '20px',
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    border: '1px solid #ccc',
    marginTop: '10px',
  };

  return (
    <div style={styles}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;
