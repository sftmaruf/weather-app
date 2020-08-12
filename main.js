const api = {
    key: "566257a1199475b1e3dc3ed90852aeac",
    base: "http://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener('keypress', setQuery);

function setQuery(value) {
    if (value.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`
    )
        // .then(response => console.log(response))
        .then(weather => {
            return weather.json();
        }).then(displayResult);
}

function displayResult(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c<span>`;

    let cWeather = document.querySelector(".current .weather");
    cWeather.innerText = weather.weather[0].main;

    let hi_low = document.querySelector(".current .hi-low");
    hi_low.innerText = `${weather.main.temp_min}°c/ ${weather.main.temp_max}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Friday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}