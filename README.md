# nagiosScripts
Collection of scripts for Nagios.

#1 - Create20mAudioAlert.js
Takes the nagios administrative page and parses it to check if there are any new critical alerts past 20 minutes old, and if yes, play an audio alert file (clinking coin). Only works on the one page I coded it for.
Edit the header to change 10.0.0.3 and change to The Correct URL for NAGIOS page.

Way 1) just paste it into Tampermonkey like that.
Way 2) Import/Load the .user.js file into Tampermonkey. (or greasemonkey)
