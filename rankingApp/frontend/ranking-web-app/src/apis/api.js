export const getObjects = async () => {
  const response = await fetch('https://api.restful-api.dev/objects');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};


export const getObjectById = async (id) => {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch object by ID');
  }
  const data = await response.json();
  return data;
};


export const createObject = async (newObject) => {
  const response = await fetch('https://api.restful-api.dev/objects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newObject),
  });

  if (!response.ok) {
    throw new Error('Failed to create object');
  }

  const data = await response.json();
  return data;
};
/*
{
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB"
  }
}

 */

export const updateObject = async (id, updatedObject) => {
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedObject),
  });

  if (!response.ok) {
    throw new Error('Failed to update object');
  }

  const data = await response.json();
  return data;
};

/*
{
  "name": "Updated Name",
  "data": {
    "year": 2023,
    "price": 1999.99
  }
}

 */


export const deleteObject = async (id) => {  
  const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete object');
  }

  return true; // or return response.status === 200;
};
