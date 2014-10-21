// var gpio = require("pi-gpio");
var Twit = require('twit')
var Yo = require("yo-api");

var interval = null;

yo_lunch = new Yo("bb3233f2-a2f3-4870-bdee-2c99cb9c6401");
yo_coffee = new Yo("0ea30d1d-d00e-4aff-9eae-e36d3085a9f4");


var twit = new Twit({
    consumer_key:         'sjHui21VXJlacMFVR4d1t7qqp'
  , consumer_secret:      'bvtfFkx76hrj0Y7vUV12g1N0ZlXyrHeFSXDKHjEHWB2ozgVrrl'
  , access_token:         '2446789172-1QcYuxxpWuwWRObp9mNUJWkt7ZedL8C4mI1GZt8'
  , access_token_secret:  'QrvVCdrIjLiGHumVactV1LsENLBph3hJhNj5CNsP2LbCC'
})

function tweet(status){
    twit.post('statuses/update', { status: status}, function(err, data, response) {

    })
}

tweet('Server Restarted. ' + new Date());

function start(){
    interval = setInterval(function(){
        gpio.read(7, function(err, value) {
            if(value){
                console.log("lunch");
                sendYo("lunch");
                sendTweet("lunch");
                stop();
                setTimeout(start, 5000);
            }
        });
        gpio.read(11, function(err, value){
            if(value){
                console.log("coffee");
                sendYo("coffee");
                sendTweet("coffee");
                stop();
                setTimeout(start, 5000);
            }
        });
        gpio.read(13, function(err, value){
            if(value){
                console.log("emergency");
                sendTweet("emergency");
                stop();
                setTimeout(start, 5000);
            }
        });
    }, 100);
}

function stop(){
    if(interval) clearInterval(interval);
    interval = null;
}

function sendYo(msg){
    if(msg == "coffee"){
        yo_coffee.yo_all();
    }else if(msg == "lunch"){
        yo_lunch.yo_all();
    }
}

function sendTweet(msg){
    if(msg == "coffee"){
        tweet("コーヒーを淹れたよ");
    }else if(msg == "lunch"){
        tweet("ごはんに行くよ");
    }else if(msg == "emergency"){
        tweet("緊急事態だよ");
    }
}
