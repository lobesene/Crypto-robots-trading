
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ourRequest = new  XMLHttpRequest();
var burl = 'https://api.binance.com';
var query = '/api/v3/ticker/price'
var url = burl + query;
ourRequest.open('GET',url,true);
ourRequest.send();
ourRequest.onloadend=()=>{

   console.log(ourRequest.responseText);
}





