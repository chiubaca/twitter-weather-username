const Twitter = require("twitter");
const fetch = require("node-fetch");

const CITY = "london";

const EMOJI_KEY = {
  Thunderstorm: "⛈️",
  Drizzle: "🌧️",
  Rain: "🌧️",
  Snow: "🌨️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌫️",
  Sand: "🌫️",
  Ash: "🌋",
  Squall: "🌫️",
  Tornado: "🌪️",
  Clear: "🌞",
  Clouds: "☁️",
};

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

function updateTwitterUsername(emoji) {
  client.post(
    "account/update_profile",
    { name: `Alex Chiu (${emoji})` },
    (error) => {
      if (error) {
        console.log("Problem updating twitter", error);
      }
      console.log("updated twitter username");
    }
  );
}

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${process.env.OWM_API_KEY}`
)
  .then((res) => res.json())
  .then((data) => {
    const owmWeatherCategory = data.weather[0].main;
    updateTwitterUsername(EMOJI_KEY[owmWeatherCategory] || "🙈");
  })
  .catch((err) => {
    console.log("Problem getting weather...", err);
  });
