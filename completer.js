const fs = require('fs');
const path = require('path');

// Read the tokens from the JSON file
const tokensPath = path.join(__dirname, 'tokens.json');
const tokensData = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Create a map of symbol to id for quick lookup
const tokens = tokensData.reduce((acc, token) => {
  const { index, ...symbolData } = token;
  const [symbol, id] = Object.entries(symbolData)[0];
  acc[symbol.toLowerCase()] = id;
  return acc;
}, {});

function getCompletions(input) {
  const lowercaseInput = input.toLowerCase();
  const matches = Object.keys(tokens).filter(symbol => symbol.startsWith(lowercaseInput));
  
  // If there's only one match and it's an exact match, we still want to show it
  if (matches.length === 1 && matches[0] === lowercaseInput) {
    return matches;
  }
  
  // Filter out the exact match if there are other partial matches
  return matches.length > 1 ? matches.filter(match => match !== lowercaseInput) : matches;
}

function getFullToken(input) {
  return tokens[input.toLowerCase()] || input;
}

module.exports = { getCompletions, getFullToken };