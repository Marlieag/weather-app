//Temperature //

function currentWeather(response) {
let cityElement= document.querySelector("#city");
cityElement.innerHTML= response.data.name;

let h1= document.querySelector("#mainTemp");
let temp= Math.round(response.data.main.temp);
h1.innerHTML=  `${temp}`;

let high= Math.round (response.data.main.temp_max);
let low= Math.round (response.data.main.temp_min);
let highTemp= document.querySelector("#high");
let lowTemp= document.querySelector("#low");
highTemp.innerHTML= `${high}°`;
lowTemp.innerHTML=`${low}°`;

let humidity= response.data.main.humidity;
let humid= document.querySelector("#currentH");
humid.innerHTML= `Humidity: ${humidity}%`;

let pressure= response.data.main.pressure;
let press= document.querySelector("#currentP");
press.innerHTML=`Pressure: ${pressure}inHg`;

let windSpeed= Math.round (response.data.wind.speed);
let wind= document.querySelector("#currentW");
wind.innerHTML= `Wind Speed: ${windSpeed}mph`;

 console.log(response);
}


// Search engine
function searchCity(city){
  let key="752caa80f650691fadd3574c96f9f105";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(`${url}`).then(currentWeather);
}

function search(event) {
  event.preventDefault();
  let city= document.querySelector("#search-input").value;
 searchCity(city);
}
 
let searchInput= document.querySelector("#search-bar");
searchInput.addEventListener("submit", search);

searchCity("Denver");

//Location

function getLocation(position){
  let key="752caa80f650691fadd3574c96f9f105";
  let url=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(`${url}`).then(currentWeather);

}
function searchLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton= document.querySelector("#locationButton");
locationButton.addEventListener("click", searchLocation);

//background color




// Today's date

let now= new Date();

let hour= now.getHours();
if (hour< 10) {
  hour = `0${hour}`;
}
let minutes= now.getMinutes();
if (minutes< 10) {
  minutes=`0${minutes}`;
}

let currentTime= document.querySelector("#current-time");
currentTime.innerHTML=`${hour}:${minutes}`;

let date= now.getDate();
let year= now.getFullYear();
let weekday=[
  "Mon", 
  "Tue",
  "Wed", 
  "Thu", 
  "Fri", 
  "Sat", 
  "Sun"
];
let day = weekday[now.getDay()];
let months= [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month= months[now.getMonth()];
let currentDate= document.querySelector("#today-date");
currentDate.innerHTML=`${day}, ${month} ${date}, ${year}`;


// Celsius to Fahrenheit



