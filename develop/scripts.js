// DOM variables
document.getElementById('hide1').style.visibility='hidden';
document.getElementById('hide2').style.visibility='hidden';
var city = document.getElementById('city');
var date = document.getElementById('date');
var history = document.getElementById('history');
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
function weather (event){
  document.getElementById('hide1').style.visibility='visible';
document.getElementById('hide2').style.visibility='visible';
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchVal.value}&units=imperial&appid=deaeafb532c77ef1da766b428ecb34ef`, {
      method: 'GET'
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // changes the data for current weather
      var currentDate = moment(data.dt * 1000).format("MM-DD-YY");
      date.textContent=currentDate;
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
        // uv index
        uv.textContent ='UV index:  ' + data2.daily[0].uvi;
        // temp
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
        // icons
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
        day1Icon.src = `./images/${icon1}.png`;
        day2Icon.src = `./images/${icon2}.png`;
        day3Icon.src = `./images/${icon3}.png`;
        day4Icon.src = `./images/${icon4}.png`;
        day5Icon.src = `./images/${icon5}.png`;
        // dates
        var day1date = document.getElementById('day1Date');
        var day2date = document.getElementById('day2Date');
        var day3date = document.getElementById('day3Date');
        var day4date = document.getElementById('day4Date');
        var day5date = document.getElementById('day5Date');
        var date1 = moment(data2.daily[1].dt * 1000).format("MM-DD-YY");
        var date2 = moment(data2.daily[2].dt * 1000).format("MM-DD-YY");
        var date3 = moment(data2.daily[3].dt * 1000).format("MM-DD-YY");
        var date4 = moment(data2.daily[4].dt * 1000).format("MM-DD-YY");
        var date5 = moment(data2.daily[5].dt * 1000).format("MM-DD-YY");
        day1date.textContent = date1;
        day2date.textContent = date2;
        day3date.textContent = date3;
        day4date.textContent = date4;
        day5date.textContent = date5;
        uvColor();
        saveToLocal();
      });   
    });
};

// changes the background of uv index 
function uvColor () {
  var uvIndex = uv.textContent.slice(9);
  if(uvIndex < 2){
    uv.setAttribute('class', 'safe');
  } else if (uvIndex < 7) {
    uv.setAttribute('class', 'concern');
  } else if (uvIndex > 8) {
    uv.setAttribute('class', 'danger');
  }
};

function saveToLocal (event) {
  localStorage.setItem('item', JSON.stringify(searchVal.value));
};

function displayHistory () {
  localVal = JSON.parse(localStorage.getItem('item'));
  var histBtn = document.createElement('Button');
  histBtn.textContent= localVal;
  histBtn.setAttribute('id', 'history-btn');
  document.getElementById('history').appendChild(histBtn);
  
  // event listener to search the history value
  histBtn.addEventListener('click', function (event){
    searchVal.value = localVal;
    histBtn.style.visibility='hidden';
    weather(event);
  }) 
};


searchBtn.addEventListener('click', weather);
displayHistory();

