import React, { useEffect, useState } from 'react';
import { getObjects } from '../../services';

const ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getObjects();
        setObjects(data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Objects List</h2>
      <ul>
        {objects.map((obj) => (
          <li key={obj.id}>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectList;
