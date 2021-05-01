// DOM variables
var city = document.getElementById('city');
var date = document.getElementById('date');
var todayTemp = document.getElementById('today-temp');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var uv = document.getElementById('uv');
var mainIcon = document.getElementById('mainIcon');
var searchBtn = document.getElementById('search-btn');
var searchVal = document.getElementById('search-bar');
// API key
var apiKey = 'deaeafb532c77ef1da766b428ecb34ef';


// calling the current weather api
function search (event){
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchVal.value}&units=imperial&appid=${apiKey}`, {
      method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // changes the data for current weather
      city.textContent = data.name;
      todayTemp.textContent = 'Temp:  ' + data.main.temp + ' F°';
      humidity.textContent = 'Humidity:   ' + data.main.humidity + ' %';
      wind.textContent = 'Wind:   ' + data.wind.speed + ' MPH';
      var iconCodeMain = data.weather[0].icon;
      mainIcon.src=`./images/${iconCodeMain}.png`;
    });
  
};



searchBtn.addEventListener('click', search)

