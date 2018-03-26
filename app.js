console.log('INIZIO DEL BOT');

var Twit = require('twit');

var chiavi = require('./Key_secret.js');

var fs = require('fs')
var logger = fs.createWriteStream('Preta22M.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

var T = new Twit(chiavi);

console.log('Log-in avvenuto correttamente.');

function BOMBA(tweet) {
	// grab ID of tweet to retweet
	var tweetId = tweet.id_str;
	var tweetName = tweet.user.screen_name;
	var testoTweet = tweet.text;
	var inRisposta = tweet.in_reply_to_user_id_str;//tweet.in_reply_to_status_id_str;
	console.log(testoTweet);

	if ( tweet.user.screen_name !== 'Preta22M' ) {
		if( testoTweet.includes('RT ') == false && inRisposta === null || testoTweet.includes('RT @'+tweet.user.screen_name) == true && inRisposta === null){
			// Fai la funzione Retweetta e metti mi piace
			console.log(tweet);
			function RTF(){
				// fai retweet
				T.post('statuses/retweet/:id', { id: tweetId }, function (err, data, response) {

					if (err){
						console.log('Errore.\n');
					}else{
						console.log('RT fatto a '+ tweetName+'\n');
					}
				});
				//metti mi piace
				T.post('favorites/create', { id: tweetId }, function (err, data, response) {
					if (err){
						console.log('errore\n');
					}else{
						console.log('LK messo a '+ tweetName+'\n');
					}
				});
				//scrivi report
				logger.write(tweet.user.url+'status/'+ tweet.id_str + ' creato il ' + tweet.created_at + "\n");
				console.log('Report fatto.\n');
			}; //fine funzione RTF

			//creo un nemro casuale da moltiplicare per fare il ritardo in millisecondi
			var r = Math.round((Math.random() * 4 + 1) *600000 + 45*60000); //r = Math.floor(Math.random() * 4) + 1;
			var tempoRitardo = Math.round(r/60000);
			console.log(tempoRitardo + ' minuti al RT e LK di ' + tweetName + '\n' );
			//faccio partire la funzione con ritardo
			setTimeout(RTF, r );
		}else{
		 	console.log('E\' un RT o un commento. Non lo retwitto.\n');
		}; //chiusura IF RT o COMMENTO
	}else{
		console.log('E\' un RT del BOT. Non fare niente.\n');
	}; //chiusura IF utente bot
}; //chiusura di BOMBA

//insert ID user account da seguire (esempio MorpheusNetwork, Vestarin).
var otppay = '934374469698588673';
var Realista = '912476913318346753';
var Eventum = '956678839563931648';
var dubtokens = '900442763598192641';
var DeHedge = '914254996182532096';
var vestarin = '928665122645692416';
var QuifasExchange = '960648946271039488';
var truegameSRL = '927929016111325188';

var the4thpillarltd = '942672513104007168';
var Alt_Estate = '910869642368966657';
var SocialWalletInc = '930801214182260737';
var ssothealth = '962547978803302400';

var SocialCXN = '837568377749180416';
var robotinaICO = '955765875428163584';
var DigitizeCoin = '950165227731017729';


//parte la connessione con
var stream = T.stream('statuses/filter', { follow:  ( ' 934374469698588673 , 912476913318346753 , 956678839563931648 , 900442763598192641 , 914254996182532096 , 928665122645692416 , 960648946271039488 , 927929016111325188 , 942672513104007168 , 910869642368966657 , 930801214182260737 , 962547978803302400 , 837568377749180416 , 955765875428163584 , 950165227731017729 ' ) });
console.log('Connesisone al utente avvenuta correttamente.\n');
//ogni volta che l'account twitta lui fa partire la funzione Bomba
stream.on('tweet', BOMBA );
