import React, { useContext } from 'react';

import { ObjectList } from "../components";
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const ProductsPage = ()=> {


  const { logout } = useContext(AuthContext);

  return (        
      <div> 
           <h2>Product List Page</h2>       
            <ObjectList/>  
            <Link to="/tasks">Go to Tasks Page</Link> 
            <button onClick={logout}>Logout</button>      
      </div>  
  );
}
export default ProductsPage;