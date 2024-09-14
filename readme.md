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

```bash
fav-token btc eth sol bnb etc ada arb op bch ltc xlm xrp
```

Example output: 
```bash
+------------------+-------------+----------------+
| Crypto           | Price (USD) | 24h Change (%) |
+------------------+-------------+----------------+
| Bitcoin          | $59735.00   | 3.32%          |
| Ethereum         | $2416.70    | 2.78%          |
| Solana           | $136.77     | 3.28%          |
| Binancecoin      | $551.14     | 1.24%          |
| Ethereum-classic | $18.61      | 1.87%          |
| Cardano          | $0.35       | 0.50%          |
| Arbitrum         | $0.53       | 1.87%          |
| Optimism         | $1.54       | 1.92%          |
| Bitcoin-cash     | $329.43     | 0.35%          |
| Litecoin         | $65.80      | 4.15%          |
+------------------+-------------+----------------+
```


## Requirements

- Node.js
- npm
