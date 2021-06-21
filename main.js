test = '{"0":["time"],"1":["empty"],"2":["joke"],"3":["empty"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["news"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}';
initialize_locations();
setTimeout(() => {  test = '{"0":["empty"],"1":["empty"],"2":["joke"],"3":["empty"],"4":["calender"],"5":["empty"],"6":["morning"],"7":["empty"],"8":["weather"],"9":["empty"],"10":["empty"],"11":["empty"],"12":["empty"],"13":["news"],"14":["empty"],"15":["empty"],"16":["empty"],"17":["empty"],"18":["empty"],"19":["empty"],"20":["empty"],"21":["empty"],"22":["empty"],"23":["empty"],"24":["empty"],"25":["empty"],"26":["empty"],"27":["empty"],"28":["empty"],"29":["empty"],"30":["empty"],"31":["empty"],"32":["empty"],"33":["empty"],"34":["empty"],"35":["empty"],"36":["empty"],"37":["empty"],"38":["empty"],"39":["empty"],"40":["empty"],"41":["empty"],"42":["empty"],"43":["empty"],"44":["empty"]}'; update_locations(); }, 4000);

function initialize_locations() {
    console.log("update");
    const requestWidgetLocation = new XMLHttpRequest();
    var gridlayout = document.getElementById("gridlayout");
    var widgetResponse;

    requestWidgetLocation.open("GET", "https://eclipse.serverict.nl/api/noAuth/user_settings/search/1");
    requestWidgetLocation.send();
    requestWidgetLocation.onload = ()=>{
    if(requestWidgetLocation.status === 200){
        
        //responseWidgetLocation = JSON.parse(requestWidgetLocation.response);
        responseWidgetLocation = JSON.parse(test);
        console.log(responseWidgetLocation);
        
        //WidgetLocationArray = JSON.parse(responseWidgetLocation.success);
        var i;
        for (i = 1; i < 46; i++) {
            gridlayout.insertAdjacentHTML('beforeend', "<div id='p" + i + "'></div>");
        }
        for (i = 0; i < 45; i++) {
            console.log(i);
            if(responseWidgetLocation[i][0] == "empty"){
                j = i + 1;
                element = document.getElementById("p" + j);
                element.setAttribute("w3-include-html", "empty");
            } else {                
                j = i + 1;
                console.log(responseWidgetLocation[i][0]);
                file = "widgets/design/" + responseWidgetLocation[i][0] + ".html";
                element = document.getElementById("p" + j);
                element.setAttribute("w3-include-html", file.toLowerCase());

                
            }
        }
    } else {
    console.log('error ${request.status}')
    } 
    display_data();
    includeHTML();
    setTimeout(() => {  display_weather(); display_morning(); display_time(); display_calender(); display_joke(); display_news(); }, 500);
    }
}

function update_locations() {
    console.log("update");
    const requestWidgetLocation = new XMLHttpRequest();
    var gridlayout = document.getElementById("gridlayout");
    var widgetResponse;

    requestWidgetLocation.open("GET", "https://eclipse.serverict.nl/api/noAuth/user_settings/search/1");
    requestWidgetLocation.send();
    requestWidgetLocation.onload = ()=>{
    if(requestWidgetLocation.status === 200){
        
        //responseWidgetLocation = JSON.parse(requestWidgetLocation.response);
        responseWidgetLocation = JSON.parse(test);
        console.log(responseWidgetLocation);
        
        //WidgetLocationArray = JSON.parse(responseWidgetLocation.success);
        var i;
        for (i = 0; i < 45; i++) {
            console.log(i);
            if(responseWidgetLocation[i][0] == "empty"){
                j = i + 1;
                element = document.getElementById("p" + j);
                element.setAttribute("w3-include-html", "empty");
            } else {                
                j = i + 1;
                console.log(responseWidgetLocation[i][0]);
                file = "widgets/design/" + responseWidgetLocation[i][0] + ".html";
                element = document.getElementById("p" + j);
                element.setAttribute("w3-include-html", file.toLowerCase());

                
            }
        }
    } else {
    console.log('error ${request.status}')
    } 
    display_data();
    includeHTML();
    setTimeout(() => {  display_weather(); display_morning(); display_time(); display_calender(); display_joke(); display_news(); }, 200);
    }
}

function display_data() {
    const widgetRequest = new XMLHttpRequest();
    widgetRequest.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
    widgetRequest.send();
    widgetRequest.onload = ()=>{
        if(widgetRequest.status === 200){
            widgetResponse = JSON.parse(widgetRequest.response);
        } else {
            console.log('error ${request.status}')
        } 
    }  
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
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

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}