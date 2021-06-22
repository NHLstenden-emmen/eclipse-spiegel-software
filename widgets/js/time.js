function timer_time(){
    var refresh=1000; // Refresh rate in milli seconds
    // call function display time everytime refresh seconds has passed
    setInterval('display_time()',refresh);
}
function display_time() {
    // get list of time widgets
    timeElements = document.getElementsByClassName("timespan");
    for (j=0; j < timeElements.length; j++) {
        // get time
        var x = new Date();
        var hour=x.getHours();
        var minute=x.getMinutes();

        timezone = timeElements[j].parentNode.parentNode.parentNode.getAttribute('param');
        //if there is a timezone selected change hours with amount of timezone
        if(timezone != NaN){
            hour += parseInt(timezone);
        }
        //if hours is more than 24 substract 24
        if(hour >24 ){
            hour -= 24;
        }
        // if hour is a single digit add a zero before the digit
        if(hour <10 ){
            hour = '0' + hour;
        }
        // if minute is a single digit add a zero before the digit
        if(minute <10 ) {
            minute = '0' + minute;
        }
        //combine hour en minute in to 1 string
        var x3 = hour+':'+minute;
        try {
            timeElements[j].innerHTML = x3;
        } catch (error) {
            return;
        }
    }
}