const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("dotenv").config();

const key = process.env.WEATHER_API_KEY;

app.post("/", function(req, res){
    console.log("form send data", req.body.cityname);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityname}&appid=${key}`, {
        method: "GET"
    }).then(res => res.json()).then(data => {
        let desc = data.weather[0].description;
        let city = data.name;
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render("index", {
            description: desc,
            city,
            temp
        });
    })
});

app.get("/", function(req, res){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tartu&appid=${key}`, {
        method: "GET"
    }).then(res => res.json()).then(data => {
        let desc = data.weather[0].description;
        let city = data.name;
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        res.render("index", {
            description: desc,
            city,
            temp
        });
    })
});

app.listen(3000, () => {
    //
    console.log("Server kuulab pordi peal 3000!")
});