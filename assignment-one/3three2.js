// 3) Get data from ALL the pages and shown in html page

const https = require('https');
const fs = require('fs');

const url = 'https://catfact.ninja/breeds';

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Error parsing JSON:', error.message));
        }
      });
    }).on('error', (error) => {
      reject(new Error('Error fetching data:', error.message));
    });
  });
}

function generateHTML(data) {
  const jsonData = JSON.stringify(data, null, 2);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Cat Breeds Data</title>
  </head>
  <body>
    <pre>${jsonData}</pre>
  </body>
  </html>
  `;

  fs.writeFile('catBreedsData.html', htmlContent, (err) => {
    if (err) {
      console.error('Error writing HTML file:', err);
    } else {
      console.log('catBreedsData.html created successfully!');
    }
  });
}

fetchData(url)
  .then((data) => {
    generateHTML(data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
