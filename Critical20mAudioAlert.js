// ==UserScript==
// @name Nagios Audio alerts
// @version 1.0.2017-06-26
// @author genBTC
// @namespace https://github.com/genbtc/nagiosScripts/
// @description This script will string and time match stuff and play audio files as alerts
// @match https://10.0.0.3/your/Nagios/Page/AggregatePage/HasToBeThatPage/index.php*
// @grant none
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
// ==/UserScript==

var startupDelay = 1000;    //How long to wait for everything to load (in ms)
var runInterval = 10000;      //How often to loop through logic (in ms) (also minimum time between different beeps)

//initialize player with sound
var player = document.createElement('audio');
player.src = 'https://dl.dropbox.com/u/7079101/coin.mp3';
player.preload = 'auto';

//run the init, and the main Loop
setTimeout(delayStart, startupDelay);
//set up the loop
function delayStart() {
    setInterval(mainLoop, runInterval);
}

//Main:
function mainLoop() {
    //Grab all the columnar elements that correspond to being lit up by the statusCritical CSS style 
    var criticalClass = "statusCritical";    
    var getcritical = document.getElementsByClassName(criticalClass);
    //Feed the 7 columns into a new group that stores it as the whole line. 
    var criticalLines = [];
    for (var i=0;i<getcritical.length;i+=7) {
        criticalLines.push(getcritical[i].parentNode);
    }
    //At this point we have a certain number of lines that are Critical that need to be dealt with. Need to be matched. 
    //Loop through all Critical lines one at a time:
    for (var i=0;i<criticalLines.length;i++) {
        var columns = criticalLines[i];
        var time = columns[5].innerHTML;
        if (!time.includes("0d 2")) return;
            // double check that the line has the word CRITICAL in column [4].
            // triple check to make sure we didnt already just alert on this, by checking the field we wrote.        
        if (columns[4].innerHTML.includes("CRITICAL") && !columns[3].innerHTML.includes("ALERTED!")) { 
            //play the audio.
            player.play();
            // write some data to that blank field, to prove to both of us we alerted on it.
            columns[3].innerHTML = "ALERTED";
        }
    }
}
