
const imageContainer = document.getElementById('imageappend');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


let count = 5;
const apiKey = 'kLkOIxIr0G05lJXYJH1TCdtdYbFdy5bqSxQwcfoPm_s';
// const collections=1;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`


//new count api
function updatedCount(newCount) {
    newCount = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount};`
}

//check the image loaded
function imageLoaded() {

    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        updatedCount()
    }
}

//help function to set attributes on dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}


//create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log(totalImages)
    photosArray.forEach((photo) => {

        const img = document.createElement('img')

        img.setAttribute('class', "imagesDiv")
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description + photo.current_user_collections.title,
            title: photo.alt_description,

        })

        //check when finish loading
        img.addEventListener('load', imageLoaded)

        imageContainer.appendChild(img)

    })
}


//get photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {
        console.log(error);
    }
}

//check if near the bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})


getPhotos();