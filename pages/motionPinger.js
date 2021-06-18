const minTimeBetweenTicks = 1500; // ms

var video = document.createElement('video');
var canvas = document.createElement('canvas');
var myAudio = new Audio('hello-there.mp3');

var lastTick = new Date();

function initSuccess() {
	DiffCamEngine.start();
}

function initError() {
	alert('Something went wrong.');
}

function capture(payload) {
    if(payload.hasMotion && new Date() - lastTick > minTimeBetweenTicks) {
        lastTick = new Date();
	myAudio.play();
    } else {
	
    }
}

DiffCamEngine.init({
	video: video,
	motionCanvas: canvas,
	initSuccessCallback: initSuccess,
	initErrorCallback: initError,
	captureCallback: capture
});

DiffCamEngine.setScoreThreshold(500);


