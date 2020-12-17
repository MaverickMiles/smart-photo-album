var loadFile = document.getElementById('load-file');
var loadButton = document.getElementById('load-button');

function callChatbotApi(method, data) {
    // params, body, additionalParams
    if (method === 'GET'){
        return sdk.searchGet(data,{},{})
    }

    return sdk.uploadPut({}, data, {});
}

function submit_query(){
    var query = document.getElementById("search-box").value;
    console.log(query);
    var data = {"q": query};

    callChatbotApi('GET', data).then((response) => {
        console.log(response);
        display_photos(response.data);
    });

}

function upload_photo(data){
    callChatbotApi('put', data).then((response) => {
        console.log(response);
    });
}

function display_photos(photo_links){
    results= document.getElementById("search-results")
    for (let i =0 ;i<=photo_links.length;i++){
        if (photo_links[i] == undefined){
            continue;
        }
        var img = document.createElement("img");
        img.src = 'https://8tvzonmf07.execute-api.us-east-1.amazonaws.com/dev/image?key='+photo_links[i]
        results.appendChild(img);
        
        // $("<img>").attr("src", ).appendTo("search-results");
    }
}

// function submit_query(){
//     var query = document.getElementById("search-box").value;
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//         console.log(this.responseText);
//         // display_photos(this.responseText);
//     }
//     });
//     query = query.replace(" ", "%20")
//     url = "https://8tvzonmf07.execute-api.us-east-1.amazonaws.com/dev/search?q="+query
//     xhr.open("GET", show%20me%20pictures%20of%20dogs%20and%20cats");
//     xhr.setRequestHeader("x-api-key", "9GreZxDXhs13dVykEulvy4997ihG6kL57WEmbXCH");

//     xhr.send();
// }

// function upload_photo(data){
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//         console.log(this.responseText);
//     }
//     });

//     xhr.open("PUT", "https://8tvzonmf07.execute-api.us-east-1.amazonaws.com/dev/upload");
//     xhr.setRequestHeader("x-api-key", "9GreZxDXhs13dVykEulvy4997ihG6kL57WEmbXCH");
//     xhr.setRequestHeader("Content-Type", "image/png");

//     xhr.send(data);
// }

loadButton.addEventListener('click', function(){
    loadFile.click();
});

loadFile.addEventListener('change', e => {
    console.log(loadFile);
    if (loadFile){
        var file = e.target.files[0]; 
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = readerEvent => {
            image = readerEvent.target.result; 
            upload_photo(image)
        }
    }
    else{
        alert("Invalid file. Please choose another file.");
    }
});