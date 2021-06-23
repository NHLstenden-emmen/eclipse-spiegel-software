function display_news() {
  for (i = 0; i < widgetResponse.length; i++) {
    if(widgetResponse[i].type == "news"){
      newsdata = widgetResponse[i].recentdata;
      newsdataArray = newsdata.split(";");
      for(i = 0; i < newsdataArray.length; i++){
        newsdataArray[i] = newsdataArray[i].slice(23,newsdataArray[i].length)
      }
      loop_news();
    }
  }
}

function timer_news(){
    var refresh=10000; // Refresh rate in milli seconds
    setInterval('loop_news()',refresh);
}

function loop_news(){
  if(j >= newsdataArray.length){
    j = 0;
  }
  try {
    document.getElementById('newstxt').innerHTML = newsdataArray[j];
  } catch (error) {
    return;
  }
  j++;
}