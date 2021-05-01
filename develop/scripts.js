// DOM variables
document.getElementById('hide1').style.visibility='hidden';
document.getElementById('hide2').style.visibility='hidden';
var city = document.getElementById('city');
var date = document.getElementById('date');
var todayTemp = document.getElementById('today-temp');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var uv = document.getElementById('uv');
var mainIcon = document.getElementById('mainIcon');
var searchBtn = document.getElementById('search-btn');
var searchVal = document.getElementById('search-bar');
var day1Temp = document.getElementById('day1Temp');
var day2Temp = document.getElementById('day2Temp');
var day3Temp = document.getElementById('day3Temp');
var day4Temp = document.getElementById('day4Temp');
var day5Temp = document.getElementById('day5Temp');
var day1humid = document.getElementById('day1Humid');
var day2humid = document.getElementById('day2Humid');
var day3humid = document.getElementById('day3Humid');
var day4humid = document.getElementById('day4Humid');
var day5humid = document.getElementById('day5Humid');



// calling the current weather api
function current (event){
  document.getElementById('hide1').style.visibility='visible';
document.getElementById('hide2').style.visibility='visible';
date.textContent='Current';
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchVal.value}&units=imperial&appid=deaeafb532c77ef1da766b428ecb34ef`, {
      method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // changes the data for current weather
      city.textContent = data.name;
      todayTemp.textContent = 'Temp:  ' + Math.floor(data.main.temp) + ' F°';
      humidity.textContent = 'Humidity:   ' + data.main.humidity + ' %';
      wind.textContent = 'Wind:   ' + data.wind.speed + ' MPH';
      var iconCodeMain = data.weather[0].icon;
      mainIcon.src=`./images/${iconCodeMain}.png`;
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      // weekly forecast
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=deaeafb532c77ef1da766b428ecb34ef`, {
        method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data2) {
        console.log(data2);
        uv.textContent ='UV index:  ' + data2.daily[0].uvi;
        day1Temp.textContent = Math.floor(data2.daily[1].temp.day) + 'F °';
        day2Temp.textContent = Math.floor(data2.daily[2].temp.day) + 'F °';
        day3Temp.textContent = Math.floor(data2.daily[3].temp.day) + 'F °';
        day4Temp.textContent = Math.floor(data2.daily[4].temp.day) + 'F °';
        day5Temp.textContent = Math.floor(data2.daily[5].temp.day) + 'F °';
        day1humid.textContent ='  ' + data2.daily[1].humidity + ' %';
        day2humid.textContent ='  ' + data2.daily[2].humidity + ' %';
        day3humid.textContent ='  ' + data2.daily[3].humidity + ' %';
        day4humid.textContent ='  ' + data2.daily[4].humidity + ' %';
        day5humid.textContent ='  ' + data2.daily[5].humidity + ' %';
        var day1Icon = document.getElementById('day1Icon');
        var day2Icon = document.getElementById('day2Icon');
        var day3Icon = document.getElementById('day3Icon');
        var day4Icon = document.getElementById('day4Icon');
        var day5Icon = document.getElementById('day5Icon');
        var icon1 = data2.daily[1].weather[0].icon;
        var icon2 = data2.daily[2].weather[0].icon;
        var icon3 = data2.daily[3].weather[0].icon;
        var icon4 = data2.daily[4].weather[0].icon;
        var icon5 = data2.daily[5].weather[0].icon;
        day1Icon.src = `./images/${icon1}.png`
        day2Icon.src = `./images/${icon2}.png`
        day3Icon.src = `./images/${icon3}.png`
        day4Icon.src = `./images/${icon4}.png`
        day5Icon.src = `./images/${icon5}.png`
      });
        
    });
};




searchBtn.addEventListener('click', current);

