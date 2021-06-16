/*const requestWeather = new XMLHttpRequest();
cityId = 2756136;
weatherurl = "https://eclipse.serverict.nl/api/noAuth/weather/search/" + cityId;
console.log(weatherurl);
requestWeather.open("GET", weatherurl);
requestWeather.send();
requestWeather.onload = ()=>{
  if(requestWeather.status === 200){
    responseWeather = JSON.parse(requestWeather.response);
    console.log(responseWeather);
    weatherdata = responseWeather.success;
    iconlocation = weatherdata.search("icon");
    icon = weatherdata.slice(iconlocation + 6, iconlocation + 9);
    locationlocation = weatherdata.search("location");
    location = weatherdata.slice(locationlocation + 8,locationlocation + 11);
    iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    document.getElementById('icon').innerHTML = "<img src='" + iconurl + "'>";
    document.getElementById('city').innerHTML = weatherdata.location;
    document.getElementById('description').innerHTML = weatherdata.main;
    
  } else {
  console.log(requestWeather.status)
  } 
}*/