const https = require('https');

function getCryptoPrice(tokens) {
  // Ensure tokens is an array and limit to 10 tokens
  tokens = Array.isArray(tokens) ? tokens.slice(0, 10) : [tokens];
  
  return new Promise((resolve, reject) => {
    const tokenIds = tokens.join(',');
    https.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&include_24hr_change=true`, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const prices = JSON.parse(data);
        const tableData = tokens.map(token => {
          if (prices[token]) {
            return [
              token.charAt(0).toUpperCase() + token.slice(1),
              `$${prices[token].usd.toFixed(2)}`,
              `${prices[token].usd_24h_change.toFixed(2)}%`
            ];
          } else {
            return [token.charAt(0).toUpperCase() + token.slice(1), 'N/A', 'N/A'];
          }
        });
        resolve(formatMergedTable(tableData));
      });
    }).on("error", (err) => {
      reject(`Error: ${err.message}`);
    });
  });
}

function formatMergedTable(data) {
  const headers = ['Crypto', 'Price (USD)', '24h Change (%)'];
  const allRows = [headers, ...data];
  
  const columnWidths = allRows.reduce((widths, row) => {
    return row.map((cell, i) => Math.max(cell.length, widths[i] || 0));
  }, []);

  const formatRow = (row) => 
    '| ' + row.map((cell, i) => cell.padEnd(columnWidths[i])).join(' | ') + ' |';
  
  const separator = '+' + columnWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';
  
  return [
    separator,
    formatRow(headers),
    separator,
    ...data.map(formatRow),
    separator
  ].join('\n');
}

module.exports = { getCryptoPrice };