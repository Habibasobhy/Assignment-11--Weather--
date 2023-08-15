"use strict"

// & Declare inputs Variable
let search = document.querySelector("#search");
let btnSearch = document.querySelector("#btnSearch");

// & Declare Today Variable
let todayDayName = document.querySelector("#todayDayName");
let todayDate = document.querySelector("#TodayDate");
let todayMonth = document.querySelector("#TodayMonth");
let userLocation = document.querySelector("#userLocation");
let todayTemp = document.querySelector("#todayTemp");
let todayIcon = document.querySelector("#todayIcon");
let todayWeather = document.querySelector("#todayWeather");
let humidity = document.querySelector("#humidity");
let windKph = document.querySelector("#windKph");
let windDirection = document.querySelector("#windDirection");


// & Declare next days variables
let nextTodayName = document.getElementsByClassName("next-today-name");
let nextTodayImg = document.getElementsByClassName("next-today-img");
let nextTodayMaxTemp = document.getElementsByClassName("next-today-max-temp")
let nextTodayMinTemp = document.getElementsByClassName("next-today-min-temp");
let nextTodayWeather = document.getElementsByClassName("next-today-weather");

btnSearch.addEventListener("click",function(){
    displayWeather();
})

search.addEventListener("input",function(){
    if(search.value.length >= 3)
    displayWeather();
});

// & For fetch Data from API
async function fetchWeatherData(value){
    let fetchData = await 
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=074a4d1e79eb499c9b4162552231208&q=${value}&days=3`);
    // console.log(fetchData);
    
 
    let weatherData = await fetchData.json();
    // console.log(weatherData);
    return weatherData;
}


// & for Display Today Data

function displayTodayData(data) {

    // ^ display Date 

    let date = new Date(data.forecast.forecastday[0].date);
    // console.log(date);

    todayDayName.innerHTML = date.toLocaleDateString("en-us",{weekday:'long'});
    // console.log(todayDayName);

    todayDate.innerHTML = date.getDate();
    // console.log(todayDate);

    todayMonth.innerHTML = date.toLocaleDateString("en-us",{month:'long'})

    // ^ Display Content
    userLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayIcon.setAttribute("src",data.current.condition.icon);
    todayWeather.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    windKph.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir
}

// & for Display Next Days Data

function displayNextDaysData(data) {

    // console.log(nextTodayMaxTemp); //^ any element in next day hold tomorrow and after tomorrow f h3ml loop tlf 3lehom w a7ot al data fehom

    let forecastData = data.forecast.forecastday;
    // console.log(forecastData);


    for (let i = 0; i < 2; i++) {

        let nextDate = new Date(forecastData[i+1].date);  // Date
        // console.log(nextDate);
        nextTodayName[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:'long'}); // Date

        nextTodayImg[i].setAttribute("src",forecastData[i+1].day.condition.icon);
        nextTodayMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextTodayMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextTodayWeather[i].innerHTML = forecastData[i+1].day.condition.text;
    }

}


// & For call all functions and displayWeather

async function displayWeather(pos){
   let weatherData = await fetchWeatherData(pos ? pos : search.value);
//    console.log(weatherData);
    displayTodayData(weatherData);
    displayNextDaysData(weatherData);
}


// & to locate a user's position using geolocation api

function showPosition(currentPosition) {
    let position = (currentPosition.coords.latitude) + "," + (currentPosition.coords.longitude);
    // console.log(position);
    displayWeather(position)
}

function error(){
    alert("Geolocation is not supported by this browser.");
}

function locateUserPosition(){
    navigator.geolocation.getCurrentPosition(showPosition,error);
    // console.log(navigator.geolocation);
}
locateUserPosition();
