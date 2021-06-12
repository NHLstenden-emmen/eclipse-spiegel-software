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
function loadJSON(){
  fetch('http://eclipse.serverict.nl/api/widget')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    let html = '';
    data.forEach(function(weather){
        html += `
          <li>${weather.temp} ${weather.discription} ${weather.city}
          </li>
        `;
    });
    document.getElementById('result').innerHTML = html;
  })
}

