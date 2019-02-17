///////////////////////////////////////////Classe & Méthodes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//--------------------------------------------------------
class Pair{
    //Constructeurs
    constructor(ask,bid){
        this.ask=ask;
        this.bid=bid;
    } 
}
//------------------------------------------------------------
var ETHBTC= new Pair(0,0);
var NEOBTC= new Pair(0,0);
var NEOETH= new Pair(0,0);

/////////////////////////////////////////////Retreiving data\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var pair1 = new  XMLHttpRequest();
var pair2 = new  XMLHttpRequest();
var pair3 = new XMLHttpRequest();

 var url1 ='https://api.binance.com/api/v3/ticker/bookTicker?symbol=ETHBTC'
 var url2='https://api.binance.com/api/v3/ticker/bookTicker?symbol=NEOBTC'
 var url3='https://api.binance.com/api/v3/ticker/bookTicker?symbol=NEOETH'

pair1.open('GET',url1,false)
pair1.send();
if (pair1.status === 200)
{
    // On traite le résultat de la requete ici 
    //laisser au moins un console log dans la boucle
    var parse1=JSON.parse(pair1.responseText);
       ETHBTC.ask= parse1.askPrice;
       ETHBTC.bid=parse1.bidPrice;
      
       console.log('--------------------ETHBTC-----------------------')
       console.log('ask:'+ETHBTC.ask);
       console.log('bid:'+ETHBTC.bid);
       

}

pair2.open('GET',url2,false)
pair2.send();
if (pair2.status === 200)
{
    // On traite le résultat de la requete ici 
    //laisser au moins un console log dans la boucle
    var parse2=JSON.parse(pair2.responseText);
       NEOBTC.ask= parse2.askPrice;
       NEOBTC.bid=parse2.bidPrice;
       console.log('--------------------NEOBTC-----------------------')
       console.log('ask:'+NEOBTC.ask);
       console.log('bid:'+NEOBTC.bid);

}

pair3.open('GET',url3,false)
pair3.send();
if (pair3.status === 200)
{
    // On traite le résultat de la requete ici 
    //laisser au moins un console log dans la boucle
    var parse3=JSON.parse(pair3.responseText);
       NEOETH.ask= parse3.askPrice;
       NEOETH.bid=parse3.bidPrice;
       console.log('--------------------NEOETH-----------------------')
       console.log('ask:'+NEOETH.ask);
       console.log('bid:'+NEOETH.bid);

}

//j'ai un amount de btc avec lequel j'achète du neo
//j'échange mon neo  contre de l'ether
//j'échange mon ether contre du btc
function Trio(amount,Ticker1,Ticker2,Ticker3){
    console.log("Step1")
    console.log("Ticker1=NEOBTC")
    var neo=amount/Ticker1.bid
    console.log("Step2")
    console.log("Ticker2=NEOETH")
    var eth=neo*Ticker2.ask
    console.log("Step3")
    console.log("Ticker3=ETHBTC")
    var btc=eth*Ticker3.ask
    
    return btc
}

console.log("//-----------------------------Main------------------------------------//")
var btc_amount=100
var test = Trio(btc_amount,NEOBTC,NEOETH,ETHBTC)
console.log(test)























