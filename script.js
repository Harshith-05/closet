document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snap = document.getElementById('snap');
    const clothesList = document.getElementById('clothesList');

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }  // Use back camera
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing the camera", err);
    });

    snap.addEventListener("click", () => {
        // Adjust canvas size to match video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        const img = new Image();
        img.src = canvas.toDataURL("image/png");
        clothesList.appendChild(img);
    });
});

