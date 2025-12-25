const apiKey = "162e69d0dad4e256e2b1bcc6da513ebd";

const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const cityInput = document.querySelector(".city-input");
const currentWeather = document.querySelector(".current-weather .details");
const forecastCards = document.querySelector(".weather-cards");

function createWeatherCard(city, weatherItem, index) {
    const temp = weatherItem.main.temp.toFixed(1);
    const feelsLike = weatherItem.main.feels_like.toFixed(1);
    const wind = weatherItem.wind.speed;
    const humidity = weatherItem.main.humidity;
    const date = new Date(weatherItem.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

    return `
    <li class="card">
      <h3>${index === 0 ? "Today" : date}</h3>
      <h4>Temperature: ${temp}°C</h4>
      <h4>Wind: ${wind} M/S</h4>
      <h4>Humidity: ${humidity}%</h4>
      <h4>Feels Like: ${feelsLike}°C</h4>
    </li>`;
}

async function getWeatherDetails(cityName, lat, lon) {
    const weatherForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(weatherForecastURL);
    const data = await response.json();

    const current = data.list[0];
    const weatherCondition = current.weather[0].main;

    // 🌤️ Set background image based on weather condition
    switch (weatherCondition) {
        case "Clear":
            document.body.style.backgroundImage = "url('sunny-bg1.jpg')";
            break;
        case "Clouds":
            document.body.style.backgroundImage = "url('cloudy-bg.jpg')";
            break;
        case "Rain":
            document.body.style.backgroundImage = "url('rainy-bg.jpg')";
            break;
        case "Snow":
            document.body.style.backgroundImage = "url('snow-bg.jpg')";
            break;
        case "Drizzle":
            document.body.style.backgroundImage = "url('drizzle-bg.jpg')";
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            document.body.style.backgroundImage = "url('misty-bg.jpg')";
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = "url('storm-bg.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('default-bg.jpg')";
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.5s ease-in-out";

    // 🔥 Update current weather display
    currentWeather.innerHTML = `
    <h2>${cityName}</h2>
    <h4>Temperature: ${current.main.temp.toFixed(1)}°C</h4>
    <h4>Wind: ${current.wind.speed} M/S</h4>
    <h4>Humidity: ${current.main.humidity}%</h4>
    <h4>Feels Like: ${current.main.feels_like.toFixed(1)}°C</h4>`;

    // 🔮 Update 5-day forecast
    forecastCards.innerHTML = "";
    const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    forecast.forEach((item, idx) => {
        forecastCards.innerHTML += createWeatherCard(cityName, item, idx);
    });
    let weather_output = document.querySelector(".weather-output");
    weather_output.style.display = "block";
}

async function getCityCoordinates(city) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const response = await fetch(geoURL);
    const data = await response.json();

    if (data.length === 0) {
        alert("City not found!");
        return;
    }

    const { lat, lon, name } = data[0];
    getWeatherDetails(name, lat, lon);
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city === "") return;
    getCityCoordinates(city);
}

function handleLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        const cityName = data[0].name;
                        getWeatherDetails(cityName, latitude, longitude);
                    });
            },
            error => {
                alert("Unable to get your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

searchBtn.addEventListener("click", handleSearch);
locationBtn.addEventListener("click", handleLocation);

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});