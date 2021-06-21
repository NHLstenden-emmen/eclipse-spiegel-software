function timer_time(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('display_time()',refresh);
}
function display_time() {
    var x = new Date();
    var hour=x.getHours();
    var minute=x.getMinutes();
    //update date
    if(hour < 1 && minute < 1){
        display_date();
    }
    //update message
    
    if(hour <10 ){hour='0'+hour;}
    if(minute <10 ) {minute='0' + minute; }
    var x3 = hour+':'+minute;
    try {
        document.getElementById('timespan').innerHTML = x3;
    } catch (error) {
        return;
    }
    timer_time();
}