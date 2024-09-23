const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("dotenv").config();

const key = process.env.WEATHER_API_KEY;

const getWeatherData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, url);
            let desc = data.weather[0].description;
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp)-273.15)

            let result = {
                description: desc,
                city,
                temp
            }

            resolve(result)
        })
        .catch(error => {
            reject(error)
        })
    })
}

app.all("/", function(req, res){
    let city;
    if(req.method == "GET") {
        city = "Tartu";
    } else {
        city = req.body.cityname;
    }
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherData(url).then(data => {
        res.render('index', data);
    })
});

app.listen(3000, () => {
    //
    console.log("Server kuulab pordi peal 3000!")
});