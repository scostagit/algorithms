import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Layout from '../layout/Layout.component';
import {
     ProductsPage, 
     LoginPage, 
     TasksPage,
     ProductManagerPage
}  from '../../pages';

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route element={<Layout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-manager" element={<ProductManagerPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            {/* Add more routes inside layout here */}
          </Route>
          <Route path="*" element={<Navigate to="/products" />} />              
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
