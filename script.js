async function retrieveTemperature(location) {
    temperatureDiv.textContent = '';
    let locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0fbedc6a540b7697b79efc90cc2a0673`
    let currentWeather = await fetch(locationUrl)
    let weatherJson = await currentWeather.json();
    console.log(weatherJson);

    let currentTemperature = weatherJson["main"]["temp"];
    currentTemperature = kelvinToCelsius(currentTemperature);
    temperatureDiv.textContent = "Current temperature: " + Math.round(currentTemperature) + "°C";

    let feelsLike = weatherJson["main"]["feels_like"];
    feelsLike = kelvinToCelsius(feelsLike);
    feelsLikeDiv.textContent = "Feels like: " + Math.round(feelsLike) + "°C";

    let weatherDescription = weatherJson["weather"][0]["main"];
    weatherDiv.textContent = "Condition: " + weatherDescription;

    let windDescription = weatherJson["wind"]["speed"];
    windDiv.textContent = "Wind: " + windDescription + " MPH";

    let humidityDescription = weatherJson["main"]["humidity"];
    humidityDiv.textContent = "Humidity: " + humidityDescription + "%";
    
    getWeatherGif(weatherDescription);
};

function kelvinToCelsius(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius;
};

function celsiusToFahrenheit(celsius) {
    let fahrenheit = (9/5)*celsius + 32;
    return fahrenheit;
};

function fahrenheitToCelsius(fahrenheit) {
    let celsius = (5/9)*(fahrenheit - 32);
    return celsius;
};

let input = document.getElementById("city-search");
const button = document.getElementById('search');
button.addEventListener("click", (event) => {
    event.preventDefault();
    city = input.value;
    retrieveTemperature(city);
});
let temperatureDiv = document.getElementById("temperature");
let feelsLikeDiv = document.getElementById("feels-like");
let weatherDiv = document.getElementById("weather");
let windDiv = document.getElementById("wind");
let humidityDiv = document.getElementById("humidity");
let weatherImg = document.getElementById("weather-gif");

const defaultCity = "Oceanside";
input.value = defaultCity;
retrieveTemperature(defaultCity);


function getWeatherGif(weather){
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=6s2WJrvbhZrJ8jYcW5c9M7rceoafwGIz&s=${weather}-weather`, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        weatherImg.src = response.data.images.original.url;
    })
    .catch((error) => {
        console.log("weather gif error")
    });
};