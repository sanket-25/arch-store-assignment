const https = require('https');

const url = 'https://catfact.ninja/breeds';

https.get(url, (response) => {
  let data = '';

  // A chunk of data has been received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received.
  response.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      // Handle the received data as needed here
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
}).on('error', (error) => {
  console.error('Error fetching data:', error.message);
});
