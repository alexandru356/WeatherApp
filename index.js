// index.js
import WEATHER_API_KEY from './apikey.js'; // Ensure the correct path and extension

const cardExpand = document.getElementById("btn1").addEventListener("click", expand);
const tempInfo = document.getElementById("temp");
const specInfo = document.querySelector(".info");
const humidityInfo = document.querySelector(".water");
const windSpeedInfo = document.querySelector(".wind");
const feelsLikeInfo = document.querySelector(".feelsLike");
const btnEvent = document.getElementById("btn1");
const cityInput = document.getElementById('search');
const apiKey = WEATHER_API_KEY;

btnEvent.addEventListener("click", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch(error){
            console.error(error);
        }
    } else{
        alert("Please enter a city");
    }
});

function expand(){
    let input = document.getElementById("search");
    if(input.value.trim() === ""){
        return alert("Please enter a city name !");
    }
    return document.getElementById("container").style.height = "400px",
    document.getElementById("container").style.transition = "height 1s"; 
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name : city, 
           main: {temp, humidity, feels_like}, 
           weather: [{description,id}],
           wind: {speed}} = data;

    const tempDisplay = document.createElement("p");
    const feelLikeDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windSpeedDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    feelLikeDisplay.textContent = `${(feels_like - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `${humidity}%`;
    windSpeedDisplay.textContent = `${(speed * 3.6).toFixed(1)}Km/h`
    descDisplay.textContent =  `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    tempDisplay.classList.add("temp-display");
    tempInfo.innerText = '';
    weatherEmoji.style.fontSize = "100px"

    tempInfo.appendChild(weatherEmoji);
    tempInfo.appendChild(tempDisplay);
    tempInfo.appendChild(descDisplay);
    humidityInfo.innerHTML = '<i class="fa-solid fa-water"></i><div class="text">Humidity</div>';
    windSpeedInfo.innerHTML = '<i class="fa-solid fa-wind"></i><div class="text">Wind Speed</div>';
    feelsLikeInfo.innerHTML = '<i class="fa-solid fa-temperature-full"></i><div class="text">Feels Like</div>';

    specInfo.style.display = "flex";
    specInfo.style.alignItems = "center";
    humidityInfo.style.gap = "5px";
    humidityInfo.style.fontSize = "15px";

    windSpeedInfo.style.gap = "5px";
    windSpeedInfo.style.fontSize = "15px";
    
    windSpeedInfo.appendChild(windSpeedDisplay);
    humidityInfo.appendChild(humidityDisplay);
    feelsLikeInfo.appendChild(feelLikeDisplay);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}
