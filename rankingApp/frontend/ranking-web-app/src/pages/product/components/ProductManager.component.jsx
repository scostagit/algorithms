import React from 'react';
import ProductForm from './ProductForm.component';
import { 
  createObject, 
  updateObject, 
  deleteObject 
} from '../../../apis/api';

const ProductManager = () => {
  return (
    <div style={{ padding: '20px' }}>      
      <ProductForm
        onCreate={createObject}
        onUpdate={updateObject}
        onDelete={deleteObject}
      />
    </div>
  );
};

export default ProductManager;
