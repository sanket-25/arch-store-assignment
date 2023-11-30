// 3) Get data from ALL the pages 

const https = require('https');

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

async function getAllData() {
  let allData = [];
  let currentPage = 1;

  try {
    while (true) {
      const currentPageData = await fetchData(`${url}?page=${currentPage}`);
      allData = allData.concat(currentPageData.data);
      
      if (currentPage === currentPageData.last_page) {
        break;
      }

      currentPage++;
    }

    console.log('All data fetched:', allData);
  } catch (error) {
    console.error(error.message);
  }
}

getAllData();
