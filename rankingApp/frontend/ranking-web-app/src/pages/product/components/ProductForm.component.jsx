import React, { useState } from 'react';

const ProductForm = ({ onCreate, onUpdate, onDelete }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await onCreate({
        name,
        data: {
          year,
          price,
        },
      });
      setMessage('Object created successfully!');
    } catch (err) {
      setMessage('Error creating object.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(id, {
        name,
        data: {
          year,
          price,
        },
      });
      setMessage('Object updated successfully!');
    } catch (err) {
      setMessage('Error updating object.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await onDelete(id);
      setMessage('Object deleted successfully!');
    } catch (err) {
      setMessage('Error deleting object.');
    }
  };

  return (
    <div>
      <h2>Product Form</h2>
      <form>
        <label>ID (for Update/Delete):</label>
        <input value={id} onChange={(e) => setId(e.target.value)} />

        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Year:</label>
        <input value={year} onChange={(e) => setYear(e.target.value)} />

        <label>Price:</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductForm;
