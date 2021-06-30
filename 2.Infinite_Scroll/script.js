const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalPhotos = 0;
let initialLoad = true;

function loadImages(){
    imagesLoaded++;
    if(imagesLoaded === totalPhotos){
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
    }
}

// helper function
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
function displayPhotos(){
    imagesLoaded = 0;
    totalPhotos = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            // to open in new window
            target: '_blank', 
        });
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // bool check if images loaded
        img.addEventListener('load', loadImages());

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// getting api from unsplash
let count = 5;
const apiKey = `kXmpxZ-kI2C5M8ELyJRZpC4RT9E4iLfaqttbZVZWvS4`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get  api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();  
    } catch (error) {
        
    }
}

// fucntion to implement infinite scroll
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }
});


// on load
getPhotos();