import React, { useContext } from 'react';

import { TodoList } from "../components";
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProductsPage = ()=> {


  const { logout } = useContext(AuthContext);

  return (        
      <div> 
           <h2>To Do Lsit</h2>       
            <TodoList/>  
            <Link to="/">Go to back</Link> 
            <button onClick={logout}>Logout</button>      
      </div>  
  );
}
export default ProductsPage;