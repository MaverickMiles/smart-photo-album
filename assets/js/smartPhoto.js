var loadFile = document.getElementById('load-file');
var loadButton = document.getElementById('load-button');
const API_KEY = '9GreZxDXhs13dVykEulvy4997ihG6kL57WEmbXCH';


function submit_query(){
    var query = document.getElementById("search-box").value;
    console.log(query);
    var data = {"q": query};

    sdk.searchGet(data,{},{}).then((response) => {
        console.log(response);
        display_photos(response.data);
    });

}

function upload_photo(key, data){
    param = {
        'Content-Type':'image/jpeg',
        'key':key
            }
    // additionalParam = {'headers':{}};

    sdk.uploadPut(param, data, {}).then((response) => {
        console.log(response);
    });
}

function display_photos(photo_links){
    results= document.getElementById("search-results")
    results.innerHTML = "";
    for (let i =0 ;i<=photo_links.length;i++){
        if (photo_links[i] == undefined){
            continue;
        }
        var img = document.createElement("img");
        img.src = 'https://8tvzonmf07.execute-api.us-east-1.amazonaws.com/dev/image?key='+photo_links[i]

        results.appendChild(img);
        
    }
}

loadButton.addEventListener('click', function(){
    console.log("Ack ME");
    loadFile.click();
});

loadFile.addEventListener('change', e => {
    console.log(loadFile);
    if (loadFile){
        var file = e.target.files[0]; 
        console.log(file.name);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = readerEvent => {
            image = readerEvent.target.result; 
            upload_photo(file.name, image);
        }
    }
    else{
        alert("Invalid file. Please choose another file.");
    }
});

// function submit_query(){
//     var query = document.getElementById("search-box").value;
//     query = query.replace(" ", "%20")

//     var settings = {
//         "url": "https://8tvzonmf07.execute-api.us-east-1.amazonaws.com/dev/search?q="+query,
//         "method": "GET",
//         "timeout": 0,
//         "headers": {
//             "X-API-KEY": "9GreZxDXhs13dVykEulvy4997ihG6kL57WEmbXCH"
//         },
//     };

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         display_photos(response);
//     });
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
//     xhr.setRequestHeader("Content-Type", "image/jpeg");

//     xhr.send(data);
// }