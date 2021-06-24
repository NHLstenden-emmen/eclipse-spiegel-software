function display_morning() {
  var data = [
    [0, 4, "Good night"], 
    [5, 11, "Good morning"], 
    [12, 17, "Good afternoon"],
    [18, 24, "Good night"]
  ],
  hr = new Date().getHours();

  for(var i = 0; i < data.length; i++){
    if(hr >= data[i][0] && hr <= data[i][1]){
      morningElements = document.getElementsByClassName("morningmessage");
      for (j=0; j < morningElements.length; j++) {
        //console.log(elements[j]);
        morningElements[j].innerHTML = data[i][2];
      }
    }
  }
}