const cardExpand = document.getElementById("btn1").addEventListener("click", expand);
const tempInfo = document.getElementById("temp");
const humidityInfo = document.querySelector(".water");
const windSpeedInfo = document.querySelector(".wind");
const btnEvent = document.getElementById("btn1");
const cityInput = document.getElementById('search');
const apiKey = 'a533f67b739103f1eb5741cecf08bb60';

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
    //insert a condition to see if the city is valid, if not show an error

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
           main: {temp, humidity}, 
           weather: [{description,id}],
           wind: {speed}} = data;
        
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const windSpeedDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `${humidity}%`;
    windSpeedDisplay.textContent = `${speed}Km/h`
    descDisplay.textContent =  `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    //Temp Display
    tempDisplay.classList.add("temp-display");
    tempInfo.innerText = '';
    tempInfo.appendChild(weatherEmoji);
    tempInfo.appendChild(tempDisplay);
    tempInfo.appendChild(descDisplay);

    //Style for Humidity && Display
    humidityInfo.style.display = "flex";
    humidityInfo.style.gap = "10px";
    humidityInfo.style.alignItems = "center";
    humidityInfo.style.fontSize = "15px";
    humidityInfo.appendChild(humidityDisplay);

    //Style for Wind Speed && Display
    windSpeedInfo.style.display = "flex";
    windSpeedInfo.style.gap = "10px";
    windSpeedInfo.style.alignItems = "center";
    windSpeedInfo.style.fontSize = "15px";
    windSpeedInfo.appendChild(windSpeedDisplay);

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