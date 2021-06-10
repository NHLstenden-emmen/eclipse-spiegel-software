const request = new XMLHttpRequest();
request.open("GET", "http://eclipse.serverict.nl/api/widgets");
request.send();
request.onload = ()=>{
  console.log(request);
  if(request.status === 200){
      console.log(JSON.parse(request.response));
       }
       else{
        console.log('error ${request.status}')
       }
}

