//Temperature //

function currentWeather(response) {
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

//Location

function getLocation(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let key="752caa80f650691fadd3574c96f9f105";
  let url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(`${url}`).then(currentWeather);

}
navigator.geolocation.getCurrentPosition(getLocation);

// Search engine
function search(event) {
  event.preventDefault();
   
  let searchBox= document.querySelector("#search-input");
  let currentCity= document.querySelector("#currentCity");
  let city= searchBox.value;
  currentCity.innerHTML= `${city}`;

  let key="752caa80f650691fadd3574c96f9f105";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(`${url}`).then(currentWeather);
}

let searchInput= document.querySelector("#search-city");
searchInput.addEventListener("submit", search);


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



