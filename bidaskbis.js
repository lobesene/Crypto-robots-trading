var GSON= require('gson');
var Zen=require('zen');

var urlk =  "https://api.kraken.com/0/public/Ticker?pair=EOSETH";
var burl = 'https://api.binance.com';
var query = '/api/v3/ticker/bookTicker?symbol=EOSETH'
var urlb = burl + query;

//----------------------------------------------------------------------------------

function xhrSuccess() { 
    this.callback.apply(this, this.arguments); 
}

function xhrError() { 
    console.error(this.statusText); 
}

function loadFile(Url1,callback1){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr1 = new  XMLHttpRequest();
    xhr1.callback = callback1;
    xhr1.arguments = Array.prototype.slice.call(arguments, 2);
    xhr1.onloadend = xhrSuccess;
    xhr1.open("GET",Url1,true);
    xhr1.send(null);    


}

function value1() {
    console.log( this.responseText);
    var info_kraken=this.responseText;
    var parsed_info=JSON.parse(info_kraken);

}

loadFile("https://api.kraken.com/0/public/Ticker?pair=EOSETH", value1,);
loadFile("https://api.binance.com/api/v3/ticker/bookTicker?symbol=EOSETH", value1);


//------------------------------------------------------------------------------







