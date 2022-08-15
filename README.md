# BTC-ADDRESS-TRACKER

## Description
A simple REST services support tracking a list of bitcoin address including associated transactions and final balance.I built a simple REST service using node.js and mongoDB and blockchain I used is [https://www.blockchain.com/api/blockchain_api](https://www.blockchain.com/api/blockchain_api)

 Reasons for choosing the stack: 
- node.js works well with json and the project requires integration with third party API. Javascript makes deserialization easier.
- NoSQL simplifies making incremental changes to schema, for types like tx which is complicated type, I can just define it mixed type without spending too much on inspecting the object structure.
- [blockchain.com](http://blockchain.com) API is straightforward and does not require me to manage API token.

API Specs you can refer to postman script [https://github.com/guandali/btc-address-tracker-take-home/blob/master/postman/Cointracker.postman_collection.json](https://github.com/guandali/btc-address-tracker-take-home/blob/master/postman/Cointracker.postman_collection.json)

Total time spend: 3 hours

## Getting Started
-  Make sure you have mongodb provsioned and replace DATABASE_URL in the `.env` file.
- `npm install`
- `npm start`




## Authors
Larry Li 

## Acknowledgments
* https://github.com/nishant-666/Rest-Api-Express-MongoDB
