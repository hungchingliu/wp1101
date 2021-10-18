var sadPhoto = [
"https://cdn.pixabay.com/photo/2014/09/16/01/19/girl-447701_960_720.jpg", 
"https://cdn.pixabay.com/photo/2018/05/22/14/00/girl-3421489_960_720.jpg",
"https://cdn.pixabay.com/photo/2017/08/10/03/47/guy-2617866_960_720.jpg",
"https://cdn.pixabay.com/photo/2017/08/21/19/00/woman-2666433_960_720.jpg",
"https://cdn.pixabay.com/photo/2017/01/06/19/49/woman-1958723_960_720.jpg",
"https://cdn.pixabay.com/photo/2014/08/08/20/55/worried-girl-413690_960_720.jpg",
"https://cdn.pixabay.com/photo/2016/02/19/11/53/pug-1210025_960_720.jpg"
];

var happyPhoto = [
"https://cdn.pixabay.com/photo/2014/12/16/22/25/sunset-570881_960_720.jpg",
"https://cdn.pixabay.com/photo/2015/11/07/11/01/couple-1030744_960_720.jpg",
"https://cdn.pixabay.com/photo/2013/02/21/19/10/mother-84628_960_720.jpg",
"https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg"
];

var madPhoto = [
"https://cdn.pixabay.com/photo/2017/02/01/12/12/angry-2030006_960_720.png",
"https://cdn.pixabay.com/photo/2021/03/31/17/10/woman-6140061_960_720.jpg",
"https://cdn.pixabay.com/photo/2019/11/27/06/58/insult-4656165_960_720.jpg"
];

var emptyPhoto = []

var albumList = {"sad-album": sadPhoto, "happy-album": happyPhoto, "mad-album": madPhoto, "empty-album": emptyPhoto};

let currentAlbum = "sad-album"
let currentPreviewId = "img-0"

function onClickAlbum(album){
    
    if(album != currentAlbum){
        if(albumList[album].length == 0){
            alert("The album is empty!!!")
            return
        }
        let node = document.getElementById(currentAlbum);
        let img = node.getElementsByTagName("img")[0]
        img.classList.toggle("clickable-album-selected");
    

        currentAlbum = album;
        photoList = albumList[album];
        node = document.getElementById(currentAlbum);
        img = node.getElementsByTagName("img")[0]
        img.classList.toggle("clickable-album-selected");
        renderPreviewImage(photoList);
    }

}


function renderPreviewImage(photoList){
   
    node = document.getElementsByClassName("preview-container")[0];
    node.innerHTML = '';

    for(let i = 0; i < photoList.length; i++){
        let previewImageWrapper = document.createElement("div");
        previewImageWrapper.classList.add('preview-image-wrapper');
        let img = document.createElement("img");
        img.src = photoList[i];
        img.id = "img-" + String(i);
        img.classList.add("clickable-img");
        img.setAttribute("onclick", "onClickPreview('" + img.id + "')")
        previewImageWrapper.appendChild(img);
        node.appendChild(previewImageWrapper);
    }

    node = document.getElementsByClassName("main-image-container")[0];
    img = node.getElementsByTagName("img")[0];
    img.src = photoList[0];
    currentPreviewId = "img-0";
    node = document.getElementById(currentPreviewId)
    node.classList.add("clickable-img-selected")


}

function onClickPreview(id){
    if(id != currentPreviewId){
        img = document.getElementById(currentPreviewId);
        img.classList.toggle("clickable-img-selected");

        node = document.getElementsByClassName("main-image-container")[0];
        img = node.getElementsByTagName("img")[0];
        img.src = albumList[currentAlbum][id.substring(4)]

        currentPreviewId = id
        img = document.getElementById(currentPreviewId);
        img.classList.toggle("clickable-img-selected")
    }
}


