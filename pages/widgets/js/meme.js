function display_meme() {
    for (i = 0; i < widgetResponse.length; i++) {
        if(widgetResponse[i].type == "meme_of_the_day"){
            meme = widgetResponse[i].recentdata;
            memeArray = meme.split(";");
            memeBottomText = memeArray[0].slice(13, memeArray[0].length-1);
            memeImg = memeArray[1].slice(8, memeArray[1].length);
            memeTopText = memeArray[2].slice(10, memeArray[2].length-1);
            try {
                document.getElementById('memetopspan').innerHTML = memeTopText;
                document.getElementById('memeimg').innerHTML = "<img id='memeimage'src='" + memeImg + "'>";
                document.getElementById('memebottomspan').innerHTML = memeBottomText;
            } catch (error) {
                return;
            }
        }
    }
}