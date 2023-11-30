const fs = require('fs');
const https = require('https');

const url = 'https://catfact.ninja/breeds';

function logResponseToFile(data) {
  fs.writeFile('response.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Response saved to response.txt');
      getNumberOfPages();
    }
  });
}

function getNumberOfPages() {
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
        getAllData(totalPages);
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
      }
    });
  }).on('error', (error) => {
    console.error('Error fetching data:', error.message);
  });
}

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

async function getAllData(totalPages) {
  let allData = [];

  try {
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const currentPageData = await fetchData(`${url}?page=${currentPage}`);
      allData = allData.concat(currentPageData.data);
    }

    console.log('All data fetched:', allData);
    const breedsByCountry = groupBreedsByCountry(allData);
    console.log(JSON.stringify(breedsByCountry, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

function groupBreedsByCountry(allData) {
  const breedsByCountry = {};

  allData.forEach((breed) => {
    const country = breed.country;
    if (!breedsByCountry[country]) {
      breedsByCountry[country] = [];
    }
    breedsByCountry[country].push({
      breed: breed.breed,
      origin: breed.origin,
      coat: breed.coat,
      pattern: breed.pattern
    });
  });

  console.log('Breeds grouped by country:', breedsByCountry);
  return breedsByCountry;
}

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    logResponseToFile(data);
  });
}).on('error', (error) => {
  console.error('Error fetching data:', error.message);
});
