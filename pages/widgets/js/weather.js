function display_weather(){
	weatherElements = document.getElementsByClassName("WeatherWid");
	for (j=0; j < weatherElements.length; j++) {
		display_weatherdata(weatherElements[j]);
		
	}
}

function display_weatherdata(element){
	const requestWeather = new XMLHttpRequest();
	cityId = element.parentNode.getAttribute('param');
	//cityId = 2756136;
	weatherurl = "https://eclipse.serverict.nl/api/noAuth/weather/search/" + cityId;
	requestWeather.open("GET", weatherurl);
	requestWeather.send();
	requestWeather.onload = ()=>{
		if(requestWeather.status === 200){
			responseWeather = JSON.parse(requestWeather.response);
			weatherdata = responseWeather.success;
			weatherdataArray = weatherdata.split(",");
			description = weatherdataArray[0].slice(6, weatherdataArray[0].length - 1);
			icon = weatherdataArray[1].slice(20,23);
			iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
			temperature = weatherdataArray[2].slice(20,22) + "°";
			locationweather = weatherdataArray[3].slice(24,weatherdataArray[3].length - 1);
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