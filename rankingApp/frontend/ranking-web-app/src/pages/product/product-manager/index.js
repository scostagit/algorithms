

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import  ProductManager from '../components/ProductManager.component'

const ProductManagerPage = ()=> {

  const { logout } = useContext(AuthContext);
  return (        
      <div> 
           <h2>Product Manager</h2>       
            <ProductManager/>  
            <Link to="/products">Go to Product List</Link> 
            <button onClick={logout}>Logout</button>      
      </div>  
  );
}
export default ProductManagerPage;