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
    initialize();
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
        var time = columns[5].split(/[ ,]+/);    //split on whitespace.
        //create a moment.js duration object that is initialized with all the right fields (the slice is to cut out the last letter.)
        var minutes = moment.duration({
                        seconds: time[3].slice(0, -1),
                        minutes: time[2].slice(0, -1),
                        hours: time[1].slice(0, -1),
                        days: time[0].slice(0, -1)
                    }).asMinutes();
        //if the minutes arent at 20 yet, skip.
        if (minutes < 20) return;
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
