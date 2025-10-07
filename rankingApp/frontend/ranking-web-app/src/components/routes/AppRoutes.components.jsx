import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Layout from '../layout/Layout.component';
import ProductsPage from '../../pages/Products.Page';
import LoginPage from '../../pages/Login.Page';
import TasksPage from '../../pages/Tasks.page';

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
