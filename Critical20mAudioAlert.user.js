// ==UserScript==
// @name Nagios Audio alerts
// @version 1.0.2017-06-26
// @author genBTC
// @namespace https://github.com/genbtc/nagiosScripts/
// @description This script will string and time match stuff and play audio files as alerts
// @include https://10.0.0.3/your/Nagios/Page/AggregatePage/HasToBeThatPage/*
// @grant none
// @require https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
// ==/UserScript==

var script = document.createElement('script');
script.id = 'Nagios-script';
script.src = 'https://cdn.rawgit.com/genBTC/nagiosScripts/Critical20mAudioAlert.js';
document.head.appendChild(script);
