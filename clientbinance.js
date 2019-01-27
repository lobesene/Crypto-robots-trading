//https://github.com/jaggedsoft/node-binance-api
const binance = require('node-binance-api')().options({
    APIKEY: '<key>',
    APISECRET: '<secret>',
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
  });

  binance.prices('BNBBTC', (error, ticker) => {
    console.log("Price of BNB: ", ticker.BNBBTC);
  });