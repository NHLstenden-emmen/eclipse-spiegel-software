/*const requestnews = new XMLHttpRequest();
var j = 0;
console.log("hi");
requestnews.open("GET", "https://eclipse.serverict.nl/api/noAuth/widgets");
requestnews.send();
requestnews.onload = ()=>{
  if(requestnews.status === 200){
    newsresponse = JSON.parse(requestnews.response);
    for (i = 0; i < newsresponse.length; i++) {
      if(newsresponse[i].type == "news"){
        newsdata = newsresponse[i].recentdata;
        newsdataArray = newsdata.split(";");
        for(i = 0; i < newsdataArray.length; i++){
          newsdataArray[i] = newsdataArray[i].slice(23,newsdataArray[i].length)
        }
        display_news();
      }
    }

  } else {
  console.log('error ${request.status}')
  } 
}*/

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
    mytime=setTimeout('loop_news()',refresh);
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
  timer_news();
}