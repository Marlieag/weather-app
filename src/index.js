//Temperature //

function currentWeather(response) {
let cityElement= document.querySelector("#city");
cityElement.innerHTML= response.data.name;

let h1= document.querySelector("#mainTemp");
let temp= Math.round(response.data.main.temp);
h1.innerHTML=  `${temp}`;
let descriptionElement= document.querySelector("#description");
descriptionElement.innerHTML= response.data.weather[0].description;
document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

celsiusTemperature = response.data.main.temp;

let high= Math.round (response.data.main.temp_max);
let low= Math.round (response.data.main.temp_min);
let highTemp= document.querySelector("#high");
let lowTemp= document.querySelector("#low");
highTemp.innerHTML= `${high}°`;
lowTemp.innerHTML=`${low}°`;
let dateElement= document.querySelector("#today-date");
dateElement.innerHTML= formatDate(response.data.dt * 1000);
let timeElement= document.querySelector("#current-time");
timeElement.innerHTML= formatHours(response.data.dt * 1000);

let humidity= response.data.main.humidity;
let humid= document.querySelector("#currentH");
humid.innerHTML= `Humidity: ${humidity}%`;

let pressure= response.data.main.pressure;
let press= document.querySelector("#currentP");
press.innerHTML=`Pressure: ${pressure}in`;

let windSpeed= Math.round (response.data.wind.speed);
let wind= document.querySelector("#currentW");
wind.innerHTML= `Wind: ${windSpeed}km/h`;

 
}

function getForcast(response){
  console.log(response.data.list[0]);
let forcastElemnent= document.querySelector("#forcast");
forcastElemnent.innerHTML= 
`  <div class="col-sm-2.5">
            <div class="card text-white bg-transparent border-0" style="width: 5rem;">
              <div class="card-body">
                <h5 class="card-title">
                  <span class="weekday">
                  Tue
                  </span>
                  <br/>
                  12/29
                </h5>
                <i class="fas fa-cloud-sun"></i>
                <p class="card-text">
                  37°
                  <br/>
                  18°
                </p>
          </div>
        </div>
      </div>`;

}

// Search engine
function searchCity(city){
  let key="752caa80f650691fadd3574c96f9f105";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(currentWeather);

  url=`api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(getForcast);
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
function formatDate (timestamp){
let date = new Date(timestamp);
let today = date.getDate();
let days = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"
];
let day = days[date.getDay()];
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
let month= months[date.getMonth()];
return `${day}, ${month} ${today}`;
}

//Time
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}




// Celsius to Fahrenheit
function displayFahrenheit(event){
  event.preventDefault();
  let tempElement=document.querySelector("#mainTemp");
  convertFahrenheit.classList.add("active");
  convertCelsius.classList.remove("active");
  let fahrenheitTemp=(celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML= Math.round(fahrenheitTemp);
}

function displayCelsius(event){
event.preventDefault();
convertCelsius.classList.add("active");
convertFahrenheit.classList.remove("active");

let tempElement=document.querySelector("#mainTemp");
tempElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature= null;
let convertFahrenheit = document.querySelector("#f-convert");
convertFahrenheit.addEventListener("click", displayFahrenheit);

let convertCelsius = document.querySelector("#c-convert");
convertCelsius.addEventListener("click", displayCelsius);

