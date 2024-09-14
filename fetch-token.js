const https = require('https');
const fs = require('fs');

function fetchCoinGeckoData(page) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.coingecko.com',
      path: `/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`,
      method: 'GET',
      headers: {
        'User-Agent': 'YourAppName/1.0'
      }
    };
    
    https.get(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        if (resp.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(`HTTP Error: ${resp.statusCode}`);
        }
      });
    }).on("error", (err) => {
      reject(`Network Error: ${err.message}`);
    });
  });
}

function writeToJsonFile(data) {
  const seenSymbols = new Set();
  const formattedData = data.reduce((acc, coin, index) => {
    if (!seenSymbols.has(coin.symbol)) {
      seenSymbols.add(coin.symbol);
      acc.push({
        index: acc.length + 1,
        [coin.symbol]: coin.id
      });
    }
    return acc;
  }, []);

  fs.writeFileSync('tokens.json', JSON.stringify(formattedData, null, 2));
  console.log('Data written to tokens.json');
}

async function fetchAllTokens() {
  let allTokens = [];
  const totalPages = 5;
  const perPage = 100;

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching page ${page}...`);
    try {
      const tokens = await fetchCoinGeckoData(page);
      allTokens = allTokens.concat(tokens);
      
      // Add a delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }

  writeToJsonFile(allTokens);
}

fetchAllTokens().catch(console.error);