var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ourRequest = new  XMLHttpRequest();
var url =  "https://api.kraken.com/0/public/Ticker?pair=EOSETH";
ourRequest.open('GET',url,true);
ourRequest.onloadend=()=>{
   console.log(ourRequest.responseText);
}
ourRequest.send();
 


