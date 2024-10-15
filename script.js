var temp = document.querySelector(".tempdata");
var input = document.querySelector(".input");
var btn = document.querySelector(".ri-search-line");
var deg = document.querySelector(".deg");
var max_temp = document.querySelector(".max_temp");
var min_temp = document.querySelector(".min_temp");
var humiditytag = document.querySelector(".humiditytag");
var cloudcover = document.querySelector(".cloudcover");
var wind_speed = document.querySelector(".wind_speed");

btn.addEventListener("click", async ()=>{
   let city = input.value;
   await getweather(city);
})
async function getcity(city){
    let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`);
    let data = await response.json();
    return data[0];
}

async function getweather(city){
    let location = await getcity(city);
    let latitude = location.lat;
    let longitude = location.lon;
    let fullcity = location.display_name;


    let weresponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&hourly=relative_humidity_2m&hourly=cloud_cover&hourly=wind_speed_10m&timezone=auto`);
    let wedata = await weresponse.json();
    console.log(wedata);
    let currentHour = new Date().getHours();

    let temperature = wedata.hourly.temperature_2m;
    let humidity = wedata.hourly.relative_humidity_2m;
    let cloud = wedata.hourly.cloud_cover;
    let speed = wedata.hourly.wind_speed_10m;
    let final_speed = speed[currentHour];
    let final_cloud = cloud[currentHour];
    let final_humidity = humidity[currentHour];
    let final =  temperature[currentHour];
    let maxtemp = Math.max(...temperature);
    let mintemp = Math.min(...temperature);
    
    deg.innerHTML = `${final}&deg;c`;
    temp.innerHTML = `${fullcity}`;
    max_temp.innerHTML = `${maxtemp}&deg;c`;
    min_temp.innerHTML = `${mintemp}&deg;c`;
    humiditytag.innerHTML = `${final_humidity}%`;
    cloudcover.innerHTML = `${final_cloud}%`;
    wind_speed.innerHTML = `${final_speed}km/h`;

}



