test = '{"0":["empty"],"1":["empty"],"2":["empty"],"3":["empty"],"4":["empty"],"5":["empty"],"6":["empty"],"7":["empty"],"8":["empty"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["empty"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["morning"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}';
initialize_locations(test);
//setTimeout(() => {  test = '{"0":["news"],"1":["weather:2755251"],"2":["joke"],"3":["empty"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather",2756136,"Emmen"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["news"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}'; update_locations(test); }, 4000);
//console.log(test);
setTimeout(() => {  test = '{"0":["news_health"],"1":["weather",2755251,"Emmen"],"2":["meme"],"3":["time"],"4":["calender"],"5":["news"],"6":["morning"],"7":["time"],"8":["empty"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["weather",2756136,"Emmen"],"13":["news_business"],"14":["news_entertainment"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}';update_locations(test); }, 2000);
var widgetResponse;
var started = false;
var Opacity = 0;
var gridlayout;
var newsdataArray = [[]] ;
display_weather();


// initialize locations and fill them with widgets
function initialize_locations(LocationJSONArray) {
    console.log(LocationJSONArray);
    responseWidgetLocation = JSON.parse(LocationJSONArray);
    var i;
    gridlayout = document.getElementById("gridlayout")
    // create 45 <div> elements with coresponding elements
    for (initializeGridIndex = 1; initializeGridIndex < 46; initializeGridIndex++) {
        gridlayout.insertAdjacentHTML('beforeend', "<div id='p" + initializeGridIndex + "'></div>");
    }

    for (initializeIndex = 0; initializeIndex < 45; initializeIndex++) {
        gridIndex = initializeIndex + 1;
        gridElement = document.getElementById("p" + gridIndex);
        console.log(responseWidgetLocation[initializeIndex][0]);
        if (responseWidgetLocation[initializeIndex][0] == "empty") {
            //widgettype is empty
            gridElement.setAttribute("widgetType", responseWidgetLocation[initializeIndex][0]);
        } else if (responseWidgetLocation[initializeIndex][0] == "weather") {
            //widgettype is weather
            console.log(responseWidgetLocation[initializeIndex][1]);
            file = "widgets/design/" + responseWidgetLocation[initializeIndex][0] + ".html";
            gridElement.setAttribute("w3-include-html", file.toLowerCase());
            gridElement.setAttribute("widgetType", responseWidgetLocation[initializeIndex][0]);
            gridElement.setAttribute("param", responseWidgetLocation[initializeIndex][1]);
        } else if (responseWidgetLocation[initializeIndex][0].includes("_")) {
            // widgettype contains a _ (news widget)
            responseWidgetLocationArray = responseWidgetLocation[initializeIndex][0].split("_")
            file = "widgets/design/" + responseWidgetLocationArray[0] + ".html";
            gridElement.setAttribute("w3-include-html", file.toLowerCase());
            gridElement.setAttribute("widgetType", responseWidgetLocationArray[0]);
            gridElement.setAttribute("param", responseWidgetLocationArray[1]);
        } else {
            // regular widget
            file = "widgets/design/" + responseWidgetLocation[initializeIndex][0] + ".html";
            gridElement.setAttribute("w3-include-html", file.toLowerCase());
            gridElement.setAttribute("widgetType", responseWidgetLocation[initializeIndex][0]);
        }
    }

    retrieve_widget_data();
    includeHTML();
    setTimeout(() => { initialize_widgets(); timer() }, 500);
}

// update locations of the widgets
function update_locations(LocationJSONArray) {
    hide();
    responseWidgetLocation = JSON.parse(LocationJSONArray);
    console.log("update locations")    
    for (updateIndex = 0; updateIndex < 45; updateIndex++) {
        gridIndex = updateIndex + 1;
        gridElement = document.getElementById("p" + gridIndex);
        if (responseWidgetLocation[updateIndex][0] == "empty") {
            if (gridElement.getAttribute("widgetType") != responseWidgetLocation[updateIndex][0]) {
                gridElement.setAttribute("widgetType", responseWidgetLocation[updateIndex][0]);
                gridElement.setAttribute("w3-include-html", "empty");
                gridElement.removeAttribute("param");
            }
        } else if (responseWidgetLocation[updateIndex][0] == "weather") {
            // Widget + param (weather)
            if (gridElement.getAttribute("widgetType") != responseWidgetLocation[0]) {
                // different widget (weather)
                file = "widgets/design/" + responseWidgetLocation[updateIndex][0] + ".html";
                gridElement.setAttribute("w3-include-html", file.toLowerCase());
                gridElement.setAttribute("widgetType", responseWidgetLocation[updateIndex][0]);
                gridElement.setAttribute("param", responseWidgetLocation[updateIndex][1]);
            } else if (gridElement.getAttribute("param") != responseWidgetLocation[updateIndex][1]) {
                // same widget different parameter
                gridElement.setAttribute("param", responseWidgetLocation[updateIndex][1]);
            }
            // dont do anything if widget and param are the same
        } else if (responseWidgetLocation[updateIndex][0].includes("_")) {
            // Widget + param (news)
            responseWidgetLocationArray = responseWidgetLocation[updateIndex][0].split("_")
            if (gridElement.getAttribute("widgetType") != responseWidgetLocationArray[0]) {
                // different widget
                file = "widgets/design/" + responseWidgetLocationArray[0] + ".html";
                gridElement.setAttribute("w3-include-html", file.toLowerCase());
                gridElement.setAttribute("widgetType", responseWidgetLocationArray[0]);
                gridElement.setAttribute("param", responseWidgetLocationArray[1]);
            } else if (gridElement.getAttribute("param") != responseWidgetLocationArray[1]) {
                // same widget different parameter
                gridElement.setAttribute("param", responseWidgetLocationArray[1]);
            }
            // dont do anything if widget and param are the same
        } else {
            // Widget without param
            console.log(responseWidgetLocation[updateIndex][0]);
            file = "widgets/design/" + responseWidgetLocation[updateIndex][0] + ".html";
            gridElement.setAttribute("w3-include-html", file.toLowerCase());
            gridElement.setAttribute("widgetType", responseWidgetLocation[updateIndex][0]);
            gridElement.removeAttribute("param");
        }
    }
    includeHTML();
    retrieve_widget_data();
    setTimeout(() => { update_widgets(); show(); }, 500);
    console.log("updated locations");
    
}

function retrieve_widget_data() {
    // retrieve widgetdata from API
    const widgetRequest = new XMLHttpRequest();
    widgetRequest.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
    widgetRequest.send();
    widgetRequest.onload = () => {
        if (widgetRequest.status === 200) {
            widgetResponse = JSON.parse(widgetRequest.response);
            console.log(widgetResponse);
            console.log("Retrieved data");
        } else {
            console.log('error ${request.status}')
        }
    }

}

function includeHTML() {
    // include the html of the widgets
    console.log("include html of the widgets")
    var HTMLElements, HTMLIndex, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    HTMLElements = document.getElementsByTagName("div");
    for (HTMLIndex = 0; HTMLIndex < HTMLElements.length; HTMLIndex++) {
        elmnt = HTMLElements[HTMLIndex];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            if (file == "empty") {
                elmnt.removeAttribute("w3-include-html");
                elmnt.innerHTML = "";
                includeHTML();
                return;
            }
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
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
        // show widgets 
        setTimeout(show(), 8000);
    } catch (error) {
        console.log(error);
    }
}

function timer() {
    //update widgets elke 30 minuten = 1800000 milisecs
    console.log("start timer");
    setInterval(update_widgets(), 1800000);
}

function show() {
    //fade in
    console.log("show")
    var op = 0.1;  // initial opacity
    var timershow = setInterval(function () {
        if (op >= 1) {
            op = 1
            clearInterval(timershow);
        }
        gridlayout.style.opacity = op;
        //gridlayout.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.05;
    }, 10);
}

function hide() {
    //fade out
    console.log("hide")
    var op = 1;  // initial opacity
    var timerhide = setInterval(function () {
        if (op <= 0.01) {
            op = 0
            clearInterval(timerhide);
        }
        gridlayout.style.opacity = op;
        //gridlayout.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;
    }, 10);
}

//Widgets display code
// Calender
function display_calender() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    dateObj = new Date()
    try {
        document.getElementById('Month').innerHTML = monthNames[new Date().getMonth()];
        document.getElementById('today').innerHTML = new Date().getDate();
        document.getElementById('year').innerHTML = new Date().getFullYear();
    } catch (error) {
        return;
    }
}

// Joke
function display_joke() {
    for (jokeIndex = 0; jokeIndex < widgetResponse.length; jokeIndex++) {
        if (widgetResponse[jokeIndex].type == "joke_of_the_day") {
            joke = widgetResponse[jokeIndex].recentdata;
            try {
                document.getElementById('joketxt').innerHTML = joke;
            } catch (error) {
                return;
            }
        }
    }
}

// Meme
function display_meme() {
    for (memeIndex = 0; memeIndex < widgetResponse.length; memeIndex++) {
        if (widgetResponse[memeIndex].type == "meme_of_the_day") {
            meme = widgetResponse[memeIndex].recentdata;
            memeArray = meme.split(";");
            memeBottomText = memeArray[0].slice(13, memeArray[0].length - 1);
            memeImg = memeArray[1].slice(8, memeArray[1].length);
            memeTopText = memeArray[2].slice(10, memeArray[2].length - 1);
            try {
                document.getElementById('memetopspan').innerHTML = memeTopText;
                document.getElementById('memeimg').innerHTML = "<img id='memeimage'src='" + memeImg + "'>";
                document.getElementById('memebottomspan').innerHTML = memeBottomText;
            } catch (error) {
                return;
            }
        }
    }
}

// Morning
function display_morning() {
    var morningData = [
        [0, 4, "Good night"],
        [5, 11, "Good morning"],
        [12, 17, "Good afternoon"],
        [18, 24, "Good night"]
    ];
    hr = new Date().getHours();

    for (var morningIndex = 0; morningIndex < morningData.length; morningIndex++) {
        if (hr >= morningData[morningIndex][0] && hr <= morningData[morningIndex][1]) {
            morningElements = document.getElementsByClassName("morningmessage");
            for (morningIndex2 = 0; morningIndex2 < morningElements.length; morningIndex2++) {
                morningElements[morningIndex2].innerHTML = morningData[morningIndex][2];
            }
        }
    }
}

// News
function display_news() {
    newsElements = document.getElementsByClassName("newstxt");
    for (newsElementsIndex = 0; newsElementsIndex < newsElements.length; newsElementsIndex++) {
        news = "news";
        newsParam = newsElements[newsElementsIndex].parentNode.parentNode.parentNode.getAttribute("param");
        if (newsParam != null){
            news += "_" + newsParam;
        }
        for (newsIndex = 0; newsIndex < widgetResponse.length; newsIndex++) {
            if (widgetResponse[newsIndex].type == news) {
                newsdata = widgetResponse[newsIndex].recentdata;
                newsdataArray[newsElementsIndex] = newsdata.split(";");
                for (newsIndex2 = 0; newsIndex2 < newsdataArray[newsElementsIndex].length; newsIndex2++) {
                    newsdataArray[newsElementsIndex][newsIndex2] = newsdataArray[newsElementsIndex][newsIndex2].slice(23, newsdataArray[newsElementsIndex][newsIndex2].length)
                }
                
            }
        }
    }
    loop_news();
}

function timer_news() {
    // call function loop_news everytime 10 seconds has passed
    setInterval('loop_news()', 10000);
}

function loop_news() {
    try {
        if (newsLoopIndex >= newsdataArray.length) {
            newsLoopIndex = 0;
        }
    } catch (error) {
        newsLoopIndex = 0;
    }
    newsElements = document.getElementsByClassName("newstxt");
    for (newsIndex = 0; newsIndex < newsElements.length; newsIndex++) {
        newsElement = newsElements[newsIndex];
        try {
            newsElement.innerHTML = newsdataArray[newsIndex][newsLoopIndex];
        } catch (error) {
            return;
        }
    }
    newsLoopIndex++;
}

// Time
function timer_time() {
    // call function display time everytime 1 seconds has passed
    setInterval('display_time()', 1000);
}

function display_time() {
    // get time
    var x = new Date();
    var hour = x.getHours();
    var minute = x.getMinutes();

    // if hour is a single digit add a zero before the digit
    if (hour < 10) {
        hour = '0' + hour;
    }
    // if minute is a single digit add a zero before the digit
    if (minute < 10) {
        minute = '0' + minute;
    }
    //combine hour en minute in to 1 string
    var x3 = hour + ':' + minute;
    // get list of time widgets
    timeElements = document.getElementsByClassName("timespan");
    for (timeIndex = 0; timeIndex < timeElements.length; timeIndex++) {
        try {
            timeElements[timeIndex].innerHTML = x3;
        } catch (error) {
            return;
        }
    }
}

// Weather
function display_weather() {
    weatherElements = document.getElementsByClassName("WeatherWid");
    for (weatherIndex = 0; weatherIndex < weatherElements.length; weatherIndex++) {
        display_weatherdata(weatherElements[weatherIndex]);
    }
}

function display_weatherdata(element) {
    const requestWeather = new XMLHttpRequest();
    cityId = element.parentNode.getAttribute('param');
    //cityId = 2756136;
    weatherurl = "https://eclipse.serverict.nl/api/noAuth/weather/search/" + cityId;
    requestWeather.open("GET", weatherurl);
    requestWeather.send();
    requestWeather.onload = () => {
        if (requestWeather.status === 200) {
            responseWeather = JSON.parse(requestWeather.response);
            weatherdata = responseWeather.success;
            weatherdataArray = weatherdata.split(",");
            description = weatherdataArray[0].slice(6, weatherdataArray[0].length - 1);
            icon = weatherdataArray[1].slice(20, 23);
            iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            temperature = weatherdataArray[2].slice(20, 22) + "°";
            locationweather = weatherdataArray[3].slice(24, weatherdataArray[3].length - 1);
            try {
                elements = element.getElementsByTagName('span');
                elements["city"].innerHTML = locationweather;
                //elements["icon"].innerHTML = "<img src='" + iconurl + "'>";
                elements["icon"].innerHTML = "<i class='wi wi-owm-" + icon + "'></i>"
                elements["temp"].innerHTML = temperature;
                elements["description"].innerHTML = description;
            } catch (error) {
                console.log(error);
                return;
            }
        } else {
            console.log(requestWeather.status)
        }
    }
}