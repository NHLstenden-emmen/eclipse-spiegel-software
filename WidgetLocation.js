const requestWidgetLocation = new XMLHttpRequest();

requestWidgetLocation.open("GET", "https://eclipse.serverict.nl/api/noAuth/user_settings/search/1");
requestWidgetLocation.send();
requestWidgetLocation.onload = ()=>{
  if(requestWidgetLocation.status === 200){
    responseWidgetLocation = JSON.parse(requestWidgetLocation.response);
    WidgetLocationArray = JSON.parse(responseWidgetLocation.success);
    var i;
    for (i = 0; i < 45; i++) {
      WidgetLocation(WidgetLocationArray[i][0],i)
    }
  } else {
  console.log('error ${request.status}')
  } 
}

/*const requestWidgetSettings = new XMLHttpRequest();
requestWidgetSettings.open("GET", "https://eclipse.serverict.nl/api/widgets");
requestWidgetSettings.send();
requestWidgetSettings.onload = ()=>{
  if(requestWidgetSettings.status === 200){
    responseWidgetSettings = JSON.parse(requestWidgetSettings.response);
    console.log(responseWidgetSettings);
  } else {
  console.log('error ${request.status}')
  } 
}*/

function WidgetLocation(item, index){
  //console.log(item.valueOf());
  if(item.valueOf() === "empty" ){
    return;
  }
  else if(item.includes("weather")) {
    element = document.getElementById("weather");
    index += 1;
    element.classList.add("p"+index);
    element.style.display = "block";
    weatherLocation = item;
  }
  else {
    element = document.getElementById(item);
    index += 1;
    element.classList.add("p"+index);
    element.style.display = "block";
  }
}