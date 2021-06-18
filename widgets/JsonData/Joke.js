const requestjoke = new XMLHttpRequest();
requestjoke.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
requestjoke.send();
requestjoke.onload = ()=>{
  if(requestjoke.status === 200){
    jokeresponse = JSON.parse(requestjoke.response);
    console.log(jokeresponse);
    for (i = 0; i < jokeresponse.length; i++) {
      if(jokeresponse[i].type == "geek_jokes"){
        recentdata = jokeresponse[i].recentdata;
        document.getElementById('joketxt').innerHTML = recentdata;
      
      }
    }

  } else {
  console.log('error ${request.status}')
  } 
}