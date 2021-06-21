function display_joke() {
  for (i = 0; i < widgetResponse.length; i++) {
    if(widgetResponse[i].type == "geek_jokes"){
      joke = widgetResponse[i].recentdata;
      try {
        document.getElementById('joketxt').innerHTML = joke;
      } catch (error) {
        return;
      }
    }
  }
}