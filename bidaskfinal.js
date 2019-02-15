///////////////////////////////////////////Classe & Méthodes\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//------------------------------------------------------------
class Exchange{
    //Constructeurs
    constructor(ask,bid){
        this.ask=ask;
        this.bid=bid;
    }   
}
//-------------------------------------------------------------
class Comparaison{
    //Constructeurs
    constructor(ask_A,bid_A,ask_B,bid_B){
    this.ask_A=ask_A;
    this.bid_A=bid_A;
    this.ask_B=ask_B;
    this.bid_B=bid_B;
 }

   //Méthodes

   Bid_A_sur_Ask_B(){
       var response =true;
       if (this.bid_A>this.ask_B)
       {  
           return response
       }
       else
       {
           return false;
       }
   }

   Bid_B_sur_Ask_A(){
    var response =true;
    if (this.bid_B>this.ask_A)
    {  
        return response
    }
    else
    {
        return false;
    }  
    }
}
//--------------------------------------------------------------------------------

Exchange_binance=new Exchange(0,0);
Exchange_kraken = new Exchange(0,0);

/////////////////////////////////////////Connect and retrieve information from Binance and Kraken APIs\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var kraken = new  XMLHttpRequest();
var binance = new  XMLHttpRequest();

var urlk =  "https://api.kraken.com/0/public/Ticker?pair=EOSETH";
var burl = 'https://api.binance.com';
var query = '/api/v3/ticker/bookTicker?symbol=EOSETH'
var urlb = burl + query;

/* Si l'on met kraken.open('GET', urlk, true), c'est une requete asynchrone, lors de l'execution de kraken.send(); 
la requete sera exécutée mais le code va passer à la suite sans se soucier du résultat et donc potentiellement exécuter la suite du code
Sans que les infos soient enregistrées dans Exchange_kraken
En mettant le dernier paramètre à false la requete devient synchrone, le code s'exécute et attend la fin de la requete pour passer à la suite
Ceci nécéssite un petit ajustement au niveau de l'inteprétation des données et du résultat de la requete
*/

kraken.open('GET',urlk,false);
binance.open('GET',urlb,false)
kraken.send();
binance.send();

// Si la requete est bien exécutée le serveur renvoie un status 200  on récupère le résultat qu'on parse puis on stocke les valeurs dans un objet Exchange
if (kraken.status === 200)
{
    // On traite le résultat de la requete ici 
    //laisser au moins un console log dans la boucle sinon boucle infini
	var parsed_kraken = JSON.parse(kraken.responseText)
	Exchange_kraken.ask = parsed_kraken.result.EOSETH.a[0]
    Exchange_kraken.bid = parsed_kraken.result.EOSETH.b[0]
    console.log("le bid est ask de EOESTH ont été récupérés depuis l'API Kraken")
    
}

if (binance.status === 200)
{
    var parsed_binance=JSON.parse(binance.responseText);
	Exchange_binance.ask = parsed_binance.askPrice;
    Exchange_binance.bid = parsed_binance.bidPrice;
    console.log("le bid est ask de EOESTH ont été récupérés depuis l'API Binance")
    
    

}

// On peut maintenant utiliser la valeur des attributs des objets Exchange_kraken et Exchange_binance dans tout le code

///////////////////////////////////////Scalable process to compare bidA/askB and bidB/askA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

Comparaison_Binance_Kraken = new Comparaison(Exchange_binance.ask,Exchange_binance.bid,Exchange_kraken.ask,Exchange_kraken.bid);
var Q1=Comparaison_Binance_Kraken.Bid_A_sur_Ask_B();
var Q2=Comparaison_Binance_Kraken.Bid_B_sur_Ask_A();

//////////////////////////////////////////////////////////Une alert par email\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  
var nodemailer = require('nodemailer');
var transporter =nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true, // use SSL encryption
    auth:{
        user: 'zoedotsue@gmail.com',
        pass: 'Pomodoro2019'
    }
});

var mailOptions ={
    from:"zoedotsue@gmail.com",
    to: "lobesene@hotmail.fr",
    subject: 'Time to sell',
    text:'ask on exchanges are raising',
    html:'<b>Ask on exchanges are raising</b><br>It is time to buy and sell back now!<br>'

};
 

if (Q1==true||Q2==true){
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        return consol.log(error);
    }
    console.log('Message.sent:'+ info.response);
});
}

////////////////////////////////////////////Main\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

console.log('--------------------API Binance-----------------------')
console.log("Binance ask : "+Exchange_binance.ask)
console.log("Binance bid : "+Exchange_binance.bid)
console.log('--------------------API Kraken------------------------')
console.log("Kraken ask : "+Exchange_kraken.ask)
console.log("Kraken bid : "+Exchange_kraken.ask)
console.log('-------Binance exchange A||Kraken exchange B-----------')
console.log("bidA/askB "+ Q1 +" and bidB/askA "+ Q2);











