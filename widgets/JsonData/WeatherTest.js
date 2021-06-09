fetch('http://eclipse.serverict.nl/api/widgets')
  .then(response => response.json())
  .then(json => console.log(json))
  
  function displayDiscription(data) {
    const discription = data.discription[0];
    const discriptionDiv = document.getElementById("discription");
  }