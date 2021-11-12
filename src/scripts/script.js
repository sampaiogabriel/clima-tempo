const search = document.querySelector('#search');
const key = 'af693ffa';

//const url_example = `https://api.hgbrasil.com/weather?format=json-cors&key=af693ffa`;
// https://console.hgbrasil.com/documentation/weather

search.addEventListener('submit', e => {
    e.preventDefault();
    const searchCity = document.querySelector('#form-search-input').value;
    getWeatherByCity(searchCity, key);
})

async function getWeatherByCity(city, key) {
    const service = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${key}&user_ip=${city}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return new Promise.reject(response.statusText);
            }
        })
        .then(weather => {
            fillCardWeather(weather.results)
            console.log(weather.results);
        })
}

async function getWeatherByIP(ip, key) {
    
    const service = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${key}&user_ip=${ip}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return new Promise.reject(response.statusText);
            }
        })
        .then(weather => {
            fillCardWeather(weather.results)
        })
}

async function getMyIp(){
    const url = `https://meuip.herokuapp.com/api/json`;

    const service = await fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return new Promise.reject(response.statusText);
        }
    })
    .then(ip => {
        getWeatherByIP(ip.ip, key);
    })
}

function fillCardWeather(city) {
    changeBackgroundByDay(city.currently);
    changeInfoWeatherByCity(city);
    changeIconWeather(city.condition_slug);
    fillForecast(city.forecast);
}

function changeBackgroundByDay(day) {
    const background = document.querySelector('main');
    day === 'day' ? background.classList.toggle('background-day') : background.classList.toggle('background-night');
}

function changeInfoWeatherByCity(city) {
    const name = document.querySelector('#city-info-name');
    const date = document.querySelector('#city-info-date');
    const description = document.querySelector('#city-info-description');
    const temp = document.querySelector('#city-info-temp-number');

    name.innerHTML = city.city;
    date.innerHTML = city.time + ' ' + city.date; //ToDo Formatar Data
    temp.innerHTML = city.temp + '°';
    description.innerHTML = city.description;
}

function changeIconWeather(icon_condition) {
    const icon = whatIconWeather(icon_condition);
    const img = document.createElement("img");
    const temp_img = document.querySelector('#city-info-temp-img');

    img.setAttribute('src', `./src/images/weather/${icon}`);
    temp_img.prepend(img);
}

function whatIconWeather(icon_condition) {
    const icons = {
        storm: 'storm.png',
        snow: 'snow.png',
        hail: 'hail.png',
        rain: 'rain.png',
        fog: 'fog.png',
        clear_day: 'day.png',
        clear_night: 'night.png',
        cloud: 'cloud.png',
        cloudly_day: 'cloudly_day.png',
        cloudly_night: 'cloudly_night.png',
        none_day: 'day.png',
        none_night: 'night.png'
    }
    return icons[icon_condition];
}

function fillForecast(forecast) {
    const container_forecast = document.querySelector('#city-forecast');
    const icon = whatIconWeather(forecast.condition);

    forecast.forEach(pill => {
        const pill_html = `
        <div class="city-pills-weather">
            <img src="./src/images/weather/${whatIconWeather(pill.condition)}">
            <p>${pill.weekday}</p>
            <p>${pill.min}°C</p>
            <p>${pill.max}°C</p>
        </div>
        `
        container_forecast.innerHTML += pill_html;
    })
};

getMyIp();
