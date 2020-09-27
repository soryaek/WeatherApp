const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    console.log(req.body.cityName); //in terminal
    const city_name = req.body.cityName;
    const apikey = "19fc06f9701ae6be52bfe0b538a36e64";
    const tempInFaranheit = "imperial";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+city_name+ "&units=" + tempInFaranheit+ "&appid=" + apikey;

    https.get(url, function(response){
      response.on("data", function (data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      // console.log(weatherDescription);
      // console.log(imageURL);
      // console.log(icon);
      // console.log(windSpeed);

      res.write("<h1 style='text-align:center; margin-top:150px'>" + city_name.charAt(0).toUpperCase()+ city_name.slice(1)+ "</h1>");
      res.write("<h3 style='text-align:center'>" + temp + "&#176 F</h3>");
      res.write("<h3 style='text-align:center'>"+ weatherDescription.charAt(0).toUpperCase()+ weatherDescription.slice(1)+ "</h3>");
      res.write("<img style='margin-left:46.5%' src=" + imageURL+">");
      res.write("<h3 style='text-align:center'>Humidity Levels at " + humidity + "</h3>");
      res.write("<h3 style='text-align:center'>Wind Speed at " + windSpeed + " mph</h3>");
      res.send()
    })
  })
  });

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
