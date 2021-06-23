test = '{"0":["time:5"],"1":["weather:2755251"],"2":["meme"],"3":["time:0"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather:2756136"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["news"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}';
initialize_locations(test);
//setTimeout(() => {  test = '{"0":["time:0"],"1":["weather:2755251"],"2":["joke"],"3":["empty"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather:2756136"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["news"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}'; update_locations(test); }, 4000);
console.log(test);
//setTimeout(() => {  test = '{"0":["time"],"1":["time"],"2":["joke"],"3":["empty"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["morning"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}'; update_locations(test); }, 4000);
var widgetResponse;
var started = false;
var Opacity = 0;

function call_api() {
    // retrieve widget location data from API
    console.log("update");
    const requestWidgetLocation = new XMLHttpRequest();
    var gridlayout = document.getElementById("gridlayout");
    var widgetResponse;

    requestWidgetLocation.open("GET", "https://eclipse.serverict.nl/api/noAuth/user_settings/search/1");
    requestWidgetLocation.send();
    requestWidgetLocation.onload = ()=>{
        if(requestWidgetLocation.status === 200){
            initialize_locations(requestWidgetLocation.response);
        } else {
            console.log('error ${request.status}')
        }
    }
}

function initialize_locations(LocationJSONArray) {
    // initialize locations and fill them with widgets
    responseWidgetLocation = JSON.parse(LocationJSONArray);
    
    var i;
    for (i = 1; i < 46; i++) {
        gridlayout.insertAdjacentHTML('beforeend', "<div id='p" + i + "'></div>");
    }
    for (i = 0; i < 45; i++) {
        if(responseWidgetLocation[i][0] == "empty"){
            j = i + 1;
            element = document.getElementById("p" + j);
            //element.setAttribute("w3-include-html", "empty");
            element.setAttribute("widgetType", responseWidgetLocation[i][0]);
        } else if(responseWidgetLocation[i][0].includes(":")){
            responseWidgetLocationArray = responseWidgetLocation[i][0].split(":")
            j = i + 1;
            file = "widgets/design/" + responseWidgetLocationArray[0] + ".html";
            element = document.getElementById("p" + j);
            element.setAttribute("w3-include-html", file.toLowerCase());
            element.setAttribute("widgetType", responseWidgetLocationArray[0]);
            element.setAttribute("param", responseWidgetLocationArray[1]);
        } else {                
            j = i + 1;
            file = "widgets/design/" + responseWidgetLocation[i][0] + ".html";
            element = document.getElementById("p" + j);
            element.setAttribute("w3-include-html", file.toLowerCase());
            element.setAttribute("widgetType", responseWidgetLocation[i][0]);
        }
    }
    display_data();
    includeHTML();
    setTimeout(() => {initialize_widgets(); timer() }, 500);
}

function update_locations(LocationJSONArray) {
    // update locations of the widgets
    var gridlayout = document.getElementById("gridlayout");
    //var widgetResponse;  
    responseWidgetLocation = JSON.parse(LocationJSONArray);
    console.log(responseWidgetLocation);
    
    var i;
    for (i = 0; i < 45; i++) {
        j = i + 1;
        if(responseWidgetLocation[i][0] == "empty"){
            element = document.getElementById("p" + j);
            if(element.getAttribute("widgetType") != responseWidgetLocation[i][0]){
                element.setAttribute("widgetType", responseWidgetLocation[i][0]);
                element.setAttribute("w3-include-html", "empty");
                element.removeAttribute("param");
            }
        } else if(responseWidgetLocation[i][0].includes(":")){
            responseWidgetLocationArray = responseWidgetLocation[i][0].split(":")
            if(element.getAttribute("widgetType") != responseWidgetLocationArray[0]){
                // different widget
                file = "widgets/design/" + responseWidgetLocationArray[0] + ".html";
                element = document.getElementById("p" + j);
                element.setAttribute("w3-include-html", file.toLowerCase());
                element.setAttribute("widgetType", responseWidgetLocationArray[0]);
                element.setAttribute("param", responseWidgetLocationArray[1]);
            } else if(element.getAttribute("param") != responseWidgetLocationArray[1]){
                // same widget different parameter
                element = document.getElementById("p" + j);
                element.setAttribute("param", responseWidgetLocationArray[1]);
            }
            // dont do anything if widget and param are the same
        } else {                
            j = i + 1;
            console.log(responseWidgetLocation[i][0]);
            file = "widgets/design/" + responseWidgetLocation[i][0] + ".html";
            element = document.getElementById("p" + j);
            element.setAttribute("w3-include-html", file.toLowerCase());
            element.removeAttribute("param");
        }
    }
    includeHTML();
    display_data();
    setTimeout(() => {update_widgets()}, 500);
    console.log("updated locations");
    
}

function display_data() {
    // retrieve widgetdata from API
    const widgetRequest = new XMLHttpRequest();
    widgetRequest.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
    widgetRequest.send();
    widgetRequest.onload = ()=>{
        if(widgetRequest.status === 200){
            widgetResponse = JSON.parse(widgetRequest.response);
            console.log("Retrieved data");
            console.log(widgetResponse);
        } else {
            console.log('error ${request.status}')
        } 
    }
    
}

function includeHTML() {
    // include the html of the widgets
    console.log("include html of the widgets")
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("div");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            if(file == "empty"){
                elmnt.removeAttribute("w3-include-html");
                elmnt.innerHTML = "";
                includeHTML();
                return;
            }
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function update_widgets() {
    // update widgets
    console.log("update");
    try {
        display_calender();
        display_joke();
        display_meme();
        display_weather();
        display_morning();
        display_news()
    } catch (error) {
        console.log(error);
    }
}

function initialize_widgets() {
    // initialize widgets
    console.log("start");
    try {
        // start display of all widgets
        display_weather();
        display_time();
        display_news()
        display_calender();
        display_joke();
        display_meme();
        display_morning();
        
        // start timers for time and news
        timer_time();
        timer_news();
        
        setTimeout(show(),6000); // dit getal moet nog aangepast
    } catch (error) {
        console.log(error);
    }
}

function timer() {
    //update widgets elke 30 minuten = 1800000 milisecs
    setInterval(update_widgets(), 1800000);
}

function show() { 
    //fade in
    console.log("show")
    element = document.getElementById("gridlayout")
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.05 ;
    }, 10);   
}

function hide() { 
    //fade out
    console.log("show")
    element = document.getElementById("gridlayout")
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * -0.05 ;
    }, 10);   
}