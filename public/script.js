const container = document.querySelector(".container");
const input = container.querySelector(".input");
const infoText = input.querySelector(".info-txt");
const inputField  = input.querySelector('input');
const liveLocation = input.querySelector("button");
const image = document.querySelector('.weather-part img');
const back = document.querySelector('header i');
const key = "3709f89e826c2838310e77a773533f2d";

function fetchData(api) {
    infoText.innerText = "Getting Details...";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result =>weatherDetails(result));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function weatherDetails(info){
    infoText.classList.replace("pending", "error");
    if(info.cod == '404'){
        infoText.innerText = `${inputField.value} isn't a valid city name!`;
    }
    else
    {
        var city = info.name, country = info.sys.country;
        var {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;
        description = capitalizeFirstLetter(description);

        container.querySelector(".temp .num").innerText = Math.floor(temp);
        container.querySelector(".temp .num-2").innerText = Math.floor(feels_like);
        container.querySelector(".humidity span").innerText = `${humidity}%`;
        container.querySelector(".weather").innerText = description;
        container.querySelector(".location span").innerText = `${city}, ${country}`;
        infoText.classList.remove("pending", "error");
        container.classList.add("active");

        if(id==800) image.src = "images/clear.svg";
        else if(id>=200 && id<=232) image.src = "images/storm.svg";
        else if(id>=600 && id<=622) image.src = "images/snow.svg";
        else if(id>=701 && id<=781) image.src = "images/haze.svg";
        else if(id>=801 && id<=804) image.src = "images/cloud.svg";
        else if((id>=300 && id<=321) || (id>=500 && id<=531)) image.src = "images/rain.svg";
    }
    console.log(info);
}

inputField.addEventListener("keyup", e=>{
    if(e.key == "Enter" && inputField.value != "")
    {
        requestApi(inputField.value);
    }
});


liveLocation.addEventListener('click', ()=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(received, error);
    }
    else alert("Your browser does not support Geolocation!");
});

function received(position) {
    const {longitude, latitude} = position.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    fetchData(api);
}

function error(error)
{
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetchData(api);
}

back.addEventListener("click", ()=>{
    container.classList.remove("active");
    inputField.value = "";
})