//downloaded using npm 
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

const PORT = process.env.PORT || 3000;
require("dotenv").config();

//required to access the apii of an external server.
const apiKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({extended: true}));

//all css,js and images files are kept in public folder and made static so every browser can access it even it is in a different directory
app.use(express.static("public"));

//to use embedded javascript templates(ejs) we need to set the view engine to ejs.
app.set("view engine","ejs");

//array to store all the details of the weather
let weatherDetails = [];

//a get request is required by the browser, so when the user loads the website the web browser sends a get request
// we are handling the get request by sending a get request to the server
app.get("/",(req,res) =>{
    //then the server sends a response(res) to the client web browser
    //to send ejs files we render it on web browser
    res.render("index",{weatherDetails:weatherDetails});
})


//we need post request for submitting forms which is much safer then get requests as the data is embeded into the body instead of the url
// we sending a post request to the root route
//form is required to send a post request
app.post("/",(req,res) =>{
    //it is the data typed by the use in his browse and we obtain it with the use of body parser.
    const query = req.body.cityName;
    const unit = "metric";

    //endpoint url 
    //needed for API connection i.e fetch information from the external server.
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    //to post data on an external server 
    //there are 6 methods to post data on an external server
    const request = https.get(url,(response) =>{
            response.on("data",(data) =>{
                //parses the data obtained after the post request was made into JSON format (an object oriented format)
                const weatherData = JSON.parse(data);
                console.log(response.statusCode);
                if(response.statusCode === 200){
                    const tempData = weatherData.main.temp;
                    const desc = weatherData.weather[0].description;
                    const speed = weatherData.wind.speed;
                    const humidity = weatherData.main.humidity;
                    const icon = weatherData.weather[0].icon;
                    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                    weatherDetails = [query,tempData,imageURL,desc,humidity,speed];

                    //redirects to root page or the home page
                    res.redirect("/");
                    request.end();
                }
                else{
                    res.redirect("/");
                    request.end();
                }
            })       
    })
})


//it listens on port 3000 or port assigned when the website is deployed.
app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
})

