//--------------------------------------MongoDocument--------------------------------------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'cryptobotsproject';

// Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser: true});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

//fonction qui insert le document dans la db cryptobotsproject 
  insertDocuments(db, function() {
    client.close();
  });
});

//-------------------------------------Classes&Méthodes------------------------------------

class History{
constructor(obj){
  //données non parsées en Json
  this.obj=obj;
  }
}
var H_kraken= new History;

class MovingAverage{
  
  //Méthodes
   X_SMA(x,tab){
    var result=0.0;
    for (var i =0;i<x;i++){
      result=result+tab[i];
    }
    result=result/x;
    return result
  }

  /*Y_EMA(y,tab){

    if(y==1){
      return tab[0];
      }
      else{
        return tab[y-1]*(2/y+1)+ Y_EMA(y-1,tab)*(1-(2/y+1))
      }

  }
*/
}

//------------------------------Connection API Kraken------------------------------------------//
var parse = require('parse-json').Parse;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var kraken = new  XMLHttpRequest();
var urlk = "https://api.kraken.com/0/public/OHLC?pair=EOSETH&interval=5&since=1548397500";
kraken.open('GET',urlk,false)
kraken.send();

if (kraken.status === 200 )
{
    //laisser au moins un console log dans la boucle
    //console.log (kraken.responseText);
    H_kraken.obj= kraken.responseText;
    console.log("Historique récupéré");

}
//----------------------------------Insertion du document dans la DB-------------------------//
//Cette fonction est appellée lors de la connection au serveur local 
//Insertion de documents
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Kraken_history');
  // Insert some documents non parsed
  var bodyJason=JSON.parse(H_kraken.obj)
  collection.insertMany([bodyJason], function(err, result) {
    assert.equal(err, null);
    console.log("Kraken historical data has been inserted into the collection");
    callback(result);
  });
}

//--------------------------------Récupérer les prix à la fermeture-------------------------//

var krakenparse=JSON.parse(H_kraken.obj);
//console.log(krakenparse.result.EOSETH);
var obj =krakenparse.result.EOSETH;
shareInfoLen = Object.keys(obj).length;
//console.log(shareInfoLen);
var array_close=[];
for(var i=0;i<shareInfoLen;i++){
array_close[i]=parseFloat(obj[i][4]);
//console.log(array_close[i]);
}
array_close_reverse=array_close.reverse();
//console.log(array_close);


//----------------------------------------Main--------------------------------------------------//
var eoseth_closing=new MovingAverage();
var Y_EMA = function recursivity(y,tab){

  if(y==1){
    return tab[0];
    }
    else{
      return tab[y-1]*(2/y+1)+ Y_EMA(y-1,tab)*(1-(2/y+1))
    }

}
var sma=eoseth_closing.X_SMA(20,array_close_reverse)
var ema=Y_EMA(50,array_close_reverse)
console.log("Le 20SMA est: " +sma, " le 50EMA est: "+ema);







