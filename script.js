async function retrieveTemperature(location="London") {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=0fbedc6a540b7697b79efc90cc2a0673`
    let currentTemperature = await fetch(weatherUrl)
    let weatherJson = await currentTemperature.json();
    console.log(kelvinToCelsius(weatherJson["main"]["temp"]));
};

function kelvinToCelsius(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius
}

function celsiusToFahrenheit(celsius) {
    let fahrenheit = (9/5)*celsius + 32;
    return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
    let celsius = (5/9)*(fahrenheit - 32);
    return celsius;
}

let input = document.getElementById("city-search");
const button = document.getElementById('search');
button.addEventListener("click", (event) => {
    event.preventDefault()
    city = input.value;
    retrieveTemperature(city);
});