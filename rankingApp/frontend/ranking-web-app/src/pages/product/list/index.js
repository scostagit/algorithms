import React, { useContext } from 'react';

import { ObjectList } from "../../../components";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

const ProductsPage = ()=> {

  const { logout } = useContext(AuthContext);
  return (        
      <div> 
           <h2>Product List Page</h2>       
            <ObjectList/>  
            <ul>
                <li>
                    <Link to="/tasks">Go to Tasks Page</Link> 
                </li>
                  <li>
                     <Link to="/product-manager">Product Manager</Link>     
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>   
                </li>
            </ul>
      </div>  
  );
}
export default ProductsPage;