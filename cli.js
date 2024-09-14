#!/usr/bin/env node

const { getCryptoPrice } = require('./crypto-prices');
const { getCompletions, getFullToken } = require('./completer');

const inputs = process.argv.slice(2);

if (inputs.length === 0) {
  console.log('Usage: fav-token <token1> [token2] [token3] ... [token10]');
  process.exit(1);
}

try {
  const exactMatches = inputs.map(getFullToken);
  const unmatched = exactMatches.filter((match, index) => match === inputs[index]);
  
  if (unmatched.length === 0) {
    // All inputs have exact matches, proceed to fetch prices
    getCryptoPrice(exactMatches)
      .then(console.log)
      .catch((error) => {
        console.error('Error fetching prices:', error);
        process.exit(1);
      });
  } else {
    // Some inputs don't have exact matches, show suggestions for them
    unmatched.forEach(input => {
      const completions = getCompletions(input);
      if (completions.length > 0) {
        console.log(`Suggestions for "${input}":`, completions.join(', '));
      } else {
        console.log(`No matching tokens found for "${input}".`);
      }
    });
    process.exit(0);
  }
} catch (error) {
  console.error('Error processing tokens:', error);
  process.exit(1);
}