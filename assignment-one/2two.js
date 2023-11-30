// 2) Console log the number of pages of data that are available on this URL

const https = require('https');

const url = 'https://catfact.ninja/breeds';

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      const totalPages = jsonData.last_page;

      console.log('Total pages available:', totalPages);
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  });
}).on('error', (error) => {
  console.error('Error fetching data:', error.message);
});
