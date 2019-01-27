var Zen=require('zen');
var GSON= require('JSONStream');
//--------------------------------------------------------------
class Exchange{

    //Constructeurs
    constructor(ask,bid){
        this.ask=ask;
        this.bid=bid;
    }
    //Méthodes
    choper_valeur_ask(ask){
        return this.ask=ask;
    
    }

    choper_valeur_bid(bid){
        return this.bid=bid;
    
    }

    
}
//---------------------------------------------------------------

Exchange_binance=new Exchange(0,0);
Exchange_kraken = new Exchange(0,0);

//---------------------------------------------------------------
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var kraken = new  XMLHttpRequest();
var binance = new  XMLHttpRequest();

var urlk =  "https://api.kraken.com/0/public/Ticker?pair=EOSETH";
var burl = 'https://api.binance.com';
var query = '/api/v3/ticker/bookTicker?symbol=EOSETH'
var urlb = burl + query;

    kraken.open('GET',urlk,true);
    binance.open('GET',urlb,true)

    
    
kraken.onloadend=(e)=>{
    
    var info_kraken=kraken.responseText;
    var parsed_kraken=JSON.parse(info_kraken);
    Zen.ask_kraken=parsed_kraken.result.EOSETH.a[0];
    Exchange_binance.ask=Zen.ask_kraken
    Zen.bid_kraken=parsed_kraken.result.EOSETH.b[0];
    Exchange_binance.bid=Zen.bid_kraken;
    console.log(info_kraken);
    console.log("Kraken ask value for EOSETH is " + Zen.ask_kraken)
    console.log("Kraken bid value for EOSETH is " + Zen.bid_kraken)

}
kraken.send();

binance.onloadend=()=>{
    
    var info_binance=binance.responseText;
    var parsed_binance=JSON.parse(info_binance);
    var ask_binance=parsed_binance.askPrice;
    var bid_binance=parsed_binance.bidPrice; 
    console.log(info_binance);
    console.log("Binance ask value for EOSETH is " + ask_binance);
    console.log("Binance bid value for EOSETH is " + bid_binance);
    
    

}
binance.send();


///////////////////////////////////////////Classe & Méthodes//////////////////////////////////////////

/*class Comparaison{
    //Constructeurs
    constructor(ask_A,bid_A,ask_B,bid_B){
    this.ask_A=ask_A;
    this.bid_A=bid_A;
    this.ask_B=ask_B;
    this.bid_B=bid_B;
 }

   //Méthodes

   Bid_A_sur_Ask_B(){
    return this.bid_A/this.ask_B;
   }

   Bid_B_sur_Ask_A(){
     return this.bid_B/this.ask_A;
    }

     
}
///////////////////////////////////////Main//////////////////////////////////////////

const Test = new Comparaison(ask_kraken,bid_kraken,ask_binance,bid_binance);
*/

 
 


 




 



