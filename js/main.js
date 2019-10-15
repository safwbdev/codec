let width = 500,
    height = 0,
    // filter = 'none',
    filter = 'filter:sepia(100%) saturate(500%) brightness(80%) hue-rotate(80deg) contrast(150%)',
    
    streaming = false;
    
    const video  = document.getElementById('video');
    const canvas  = document.getElementById('canvas');
    const photos  = document.getElementById('photos');
    const photoButton  = document.getElementById('photo-button');
    const clearButton  = document.getElementById('clear-button');
    const photoFilter  = document.getElementById('photo-filter');
    
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
        video.srcObject = stream;
        video.style = filter;
        video.play();
})
.catch(function(err){
    console.log(`Error: ${err}`);
});

video.addEventListener('canplay', function(e) {
    if(!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
    }
}, false);

photoButton.addEventListener('click', function(e) {
    takePicture();
}, false);

photoFilter.addEventListener('change', function(e) {
    filter = e.target.value;
    video.style.filter = filter;
    canvas.style.filter = filter;
    e.preventDefault();
});

clearButton.addEventListener('click',function(e) {
    photos.innerHTML = '';
    filter = 'none';
    video.style.filter = filter;
    photoFilter.selectedIndex = 0;
})

function takePicture() {
    console.log('pic');
    const context = canvas.getContext('2d');
    if(width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0,0 , width, height);

        const imgUrl = canvas.toDataURL('image/png');

        // console.log(imgUrl);

        const img = document.createElement('img');

        img.setAttribute('src', imgUrl);

        img.style.filter = filter;

        photos.appendChild(img);
    }
}