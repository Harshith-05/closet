document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snap = document.getElementById('snap');
    const clothesList = document.getElementById('clothesList');
    const suggestion = document.getElementById('suggestion');

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing the camera", err);
        });

    snap.addEventListener("click", () => {
        context.drawImage(video, 0, 0, 320, 240);
        const img = new Image();
        img.src = canvas.toDataURL("image/png");
        clothesList.appendChild(img);
    });

    async function getWeather(location) {
        const apiKey = 'YOUR_API_KEY';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    }

    function suggestOutfit(weather) {
        let suggestionText;
        if (weather.main.temp < 10) {
            suggestionText = "It's cold! Wear something warm like a coat and sweater.";
        } else if (weather.main.temp < 20) {
            suggestionText = "It's a bit chilly. How about a jacket and jeans?";
        } else {
            suggestionText = "The weather is nice. A t-shirt and shorts would be perfect.";
        }
        suggestion.textContent = suggestionText;
    }

    // Example of how you might get the weather and suggest an outfit
    // You can replace 'London' with any location or use geolocation API to get user's location
    getWeather('London').then(weather => {
        suggestOutfit(weather);
    });
});
