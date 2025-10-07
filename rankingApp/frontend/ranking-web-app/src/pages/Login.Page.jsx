import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => login('john', '123')}>Login as John</button>
    </div>
  );
};

export default LoginPage;
