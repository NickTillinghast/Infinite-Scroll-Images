const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []
let initialLoad = true;


// UnSplash API

let count = 5;
const apiKey = 'rWG15DAN1oa0QPFXI31LktfbSDHOs1ppUr7kdJqND_E';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`
// check if all images were loaded 
function imageLoaded() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
        // initialLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}

// helper function to set attributes on DOm elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for links and photos, add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // create <img> for photo

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // event listener, check when each is finished loading

        img.addEventListener('load', imageLoaded)

        // put <img> inside <a>, then put both inside imageContainer Element

        item.appendChild(img);
        imageContainer.appendChild(item);
        // console.log(photo);
    });
}
// Get photos from Unslash API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// check to see if the scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        // console.log('load more')
    }
})

// On Load
getPhotos();