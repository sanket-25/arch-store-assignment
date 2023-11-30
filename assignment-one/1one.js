// 1) Log the response AS-IS to a text file 

const https = require('https');
const fs = require('fs');

const url = 'https://catfact.ninja/breeds';

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    try {
      fs.writeFileSync('response.txt', data);
      console.log('Response saved to response.txt');
    } catch (error) {
      console.error('Error writing to file:', error.message);
    }
  });
}).on('error', (error) => {
  console.error('Error fetching data:', error.message);
});
