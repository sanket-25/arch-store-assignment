// 4) Using the data from ALL the pages Return cat breeds grouped by Country

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

async function groupBreedsByCountry() {
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
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

groupBreedsByCountry()
  .then((breedsByCountry) => {
    const formattedData = JSON.stringify(breedsByCountry, null, 2);
    console.log(formattedData);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
