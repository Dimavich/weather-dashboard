// DOM variables
var city = document.getElementById('city');
var date = document.getElementById('date');
var todayTemp = document.getElementById('today-temp');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var uv = document.getElementById('uv');
var searchBtn = document.getElementById('search-btn');
var searchVal = document.getElementById('search-bar');
// API key
var apiKey = 'deaeafb532c77ef1da766b428ecb34ef';


// calling the weather api
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
    });
};



searchBtn.addEventListener('click', search)

