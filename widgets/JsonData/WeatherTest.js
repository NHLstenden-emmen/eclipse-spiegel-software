const requestWeather = new XMLHttpRequest();
cityId = 2756136;
weatherurl = "https://eclipse.serverict.nl/api/noAuth/weather/search/" + cityId;
requestWeather.open("GET", weatherurl);
requestWeather.send();
requestWeather.onload = ()=>{
  if(requestWeather.status === 200){
    responseWeather = JSON.parse(requestWeather.response);

    weatherdata = responseWeather.success;
    weatherdataArray = weatherdata.split(",");
    description = weatherdataArray[0].slice(20, weatherdataArray[0].length - 1);
    icon = weatherdataArray[1].slice(20,23);
    iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    temperature = weatherdataArray[2].slice(20,22);
    locationweather = weatherdataArray[3].slice(24,weatherdataArray[3].length - 1);

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = temperature;
    document.getElementById('icon').innerHTML = "<img src='" + iconurl + "'>";
    document.getElementById('city').innerHTML = locationweather;
    
    
  } else {
  console.log(requestWeather.status)
  } 
}