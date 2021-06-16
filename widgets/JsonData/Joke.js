/*const request = new XMLHttpRequest();
request.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
//request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Emmen&appid=274e1a939869507f8611117cc192e236");
request.send();
request.onload = ()=>{
  console.log(request);
  if(request.status === 200){
    jokeresponse = JSON.parse(request.response);
    for (i = 0; i < jokeresponse.length; i++) {
      if(jokeresponse[i].type == "morning"){
        recentdata = jokeresponse[i].recentdata;
        console.log(JSON.parse(recentdata));

      }
    }

  } else {
  console.log('error ${request.status}')
  } 
}*/