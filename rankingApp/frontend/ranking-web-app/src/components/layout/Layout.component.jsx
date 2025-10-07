import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1>My App Layout</h1>
      {/* Shared UI like header, navbar etc. */}
      <Outlet /> {/* Page-specific content goes here */}
    </div>
  );
};

export default Layout;
