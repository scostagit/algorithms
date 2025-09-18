// Your API key (this would normally be kept secret, but here it's just an example)
const apiKey = 'YOUR_API_KEY';

// The URL of the API endpoint you want to call (e.g., weather API)
const apiUrl = 'https://api.example.com/weather?city=London';

// Function to make an API request with the API key
async function fetchWeather() {
  try {
    // Making a GET request with the API key in the headers
    const response = await fetch(apiUrl, {
      method: 'GET',  // HTTP method
      headers: {
        'Authorization': `Bearer ${apiKey}`  // Passing API key in the Authorization header
      }
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('API request failed!');
    }

    // Parse the response as JSON (assuming the API returns data in JSON format)
    const data = await response.json();

    // Log the data (for example, showing the weather information)
    console.log('Weather Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to fetch weather data
fetchWeather();
