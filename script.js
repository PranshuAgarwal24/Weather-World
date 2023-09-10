const weatherApi = {
    key: "d01fd1b4f6bda81f95310f4bfe1164d0",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchIPBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchIPBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchIPBox.value);
        getWeatherReport(searchIPBox.value);
        document.querySelector('.weath-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear_sky.jpeg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rainy.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snowy.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpeg')";
        
    } 
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}