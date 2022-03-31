var divEl = document.querySelector(".search");
var newDivEl = document.querySelector("#right-side");
var btnEl = document.querySelector("button");
var today = moment().format('MMMM Do YYYY');
var innerHTML = ``;



function searchCity(urlApi, name) {
    fetch(urlApi).then(function(res) {
        if(res.ok){
            res.json().then(function(data){
                processData(data, name);
            })
        }
    })
}

function getCity(){
    var textEl = document.querySelector("#text");
    var city = textEl.value;
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + "49daffc5e5547ad25fd610e19b50c935";

    fetch(api).then(function(res) {
        res.json().then(function(data){
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var urlApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + "49daffc5e5547ad25fd610e19b50c935";

            searchCity(urlApi, city);
        })
    })
    

}

function processData(data, name){
    clearInnerHTML()


    var kelv = data.current.temp - 273.15;
    var temp = kelv * 9/5 + 32; 
    var humidity = data.current.humidity;
    var wind = data.current.wind_speed;
    var uvi = data.current.uvi;
    
    innerHTML = `
        <div class="weather">
            <h2 class="font-weight-bold">${name} ${today}</h2>
            <p>Temp: ${temp} f.<p>
            <p>Wind: ${wind}<p>
            <p>Humidity: ${humidity}%<p>
            <p>UV index: ${uvi}<p>
        </div>
    
    `;

    $(newDivEl).append(innerHTML);

    

}

function clearInnerHTML(){
    newDivEl.innerHTML = "";
}

btnEl.addEventListener("click", getCity);

