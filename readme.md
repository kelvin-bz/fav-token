# Fav-Token CLI

A command-line tool for quick cryptocurrency price checks and token suggestions.

## Global Installation

Install Fav-Token globally using npm:

```bash
npm install -g fav-token
```


## Usage

### Get Token Suggestions

To see token suggestions, type part of a token symbol:

```bash
fav-token et
```

Example output:

```
Suggestions: eth, etc, ethdydx, ethfi, ethw, ethx
```


### Fetch Token Price

To get the current price for a specific token:

```bash
fav-token eth
```
```bash
+----------+-------------+----------------+
| Crypto   | Price (USD) | 24h Change (%) |
+----------+-------------+----------------+
| Ethereum | $2432.45    | 3.14%          |
+----------+-------------+----------------+
```

### Fetch Multiple Token Prices

You can fetch prices for multiple tokens (up to 10) in a single command:

Example output: 
```bash

| Crypto      | Price (USD) | 24h Change (%) |
+-------------+-------------+----------------+
| Bitcoin     | $60335.00   | 4.10%          |
| Ethereum    | $2431.05    | 3.06%          |
| Solana      | $139.46     | 3.50%          |
| Binancecoin | $556.16     | 2.29%          |
+-------------+-------------+----------------+
```


## Requirements

- Node.js
- npm
