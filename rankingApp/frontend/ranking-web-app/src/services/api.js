export const getObjects = async () => {
  const response = await fetch('https://api.restful-api.dev/objects');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};
