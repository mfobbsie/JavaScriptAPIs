document.addEventListener("DOMContentLoaded", () => {
  // Config
  const API_KEYS = {
    tmdb: "YOUR_TMDB_API_KEY",
  };

  const API_URLS = {
    catImage: "https://api.thecatapi.com/v1/images/search",
    currencyBase: "https://open.er-api.com/v6/latest/USD",
    dogImage: "https://dog.ceo/api/breeds/image/random",
    githubUserBase: "https://api.github.com/users",
    randomJoke: "https://official-joke-api.appspot.com/random_joke",
    trendingMoviesBase: "https://api.themoviedb.org/3/trending/movie/week",
    weatherForecastBase: "https://api.open-meteo.com/v1/forecast",
    weatherGeocodeBase: "https://geocoding-api.open-meteo.com/v1/search",
  };

  // DOM references
  const buttons = {
    cat: document.querySelector(".get-cat-button"),
    currency: document.querySelector(".get-currency-button"),
    dog: document.querySelector(".get-dog-button"),
    githubUser: document.querySelector(".get-github-user-button"),
    joke: document.querySelector(".get-joke-button"),
    meetup: document.querySelector(".get-meetup-button"),
    trendingMovies: document.querySelector(".get-trending-movies-button"),
    weather: document.querySelector(".get-weather-button"),
  };

  const containers = {
    cat: document.querySelector(".cat-container"),
    currency: document.querySelector(".currency-container"),
    dog: document.querySelector(".dog-container"),
    githubUser: document.querySelector(".github-user-container"),
    joke: document.querySelector(".joke-container"),
    meetup: document.querySelector(".meetup-container"),
    trendingMovies: document.querySelector(".trending-movies-container"),
    weather: document.querySelector(".weather-container"),
  };

  // Helpers
  function getResultArea(container, className) {
    let resultArea = container.querySelector(`.${className}`);

    if (!resultArea) {
      resultArea = document.createElement("div");
      resultArea.classList.add(className);
      container.appendChild(resultArea);
    }

    return resultArea;
  }

  function setError(container, message) {
    const resultArea = getResultArea(container, "result-area");
    resultArea.innerHTML = `<p>${message}</p>`;
  }

  async function fetchJson(url, errorMessage) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(errorMessage);
    }

    return response.json();
  }

  function getWeatherDescription(weatherCode) {
    const weatherCodeMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return weatherCodeMap[weatherCode] || "Unknown conditions";
  }

  function getWeatherEmoji(weatherCode) {
    if (weatherCode === 0) return "☀️";
    if ([1, 2].includes(weatherCode)) return "🌤️";
    if (weatherCode === 3) return "☁️";
    if ([45, 48].includes(weatherCode)) return "🌫️";
    if ([51, 53, 55, 56, 57].includes(weatherCode)) return "🌦️";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "❄️";
    if ([95, 96, 99].includes(weatherCode)) return "⛈️";
    return "🌡️";
  }

  // Handlers
  async function getCatImage() {
    try {
      const data = await fetchJson(
        API_URLS.catImage,
        "Could not fetch a cat image.",
      );

      const resultArea = getResultArea(containers.cat, "result-area");
      let img = resultArea.querySelector(".cat-image");

      if (!img) {
        img = document.createElement("img");
        img.classList.add("cat-image");
        resultArea.appendChild(img);
      }

      img.src = data[0].url;
      img.alt = "Random Cat";
    } catch (error) {
      setError(containers.cat, error.message);
    }
  }

  async function getCurrencyRates() {
    try {
      const data = await fetchJson(
        API_URLS.currencyBase,
        "Could not fetch exchange rates.",
      );

      const resultArea = getResultArea(containers.currency, "result-area");
      const ratesList = document.createElement("ul");
      const topRates = Object.entries(data.rates).slice(0, 12);

      topRates.forEach(([currency, rate]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${currency}: ${rate}`;
        ratesList.appendChild(listItem);
      });

      resultArea.innerHTML = "<h3>Exchange Rates (Base: USD)</h3>";
      resultArea.appendChild(ratesList);
    } catch (error) {
      setError(containers.currency, error.message);
    }
  }

  async function getDogImage() {
    try {
      const data = await fetchJson(
        API_URLS.dogImage,
        "Could not fetch a dog image.",
      );

      const resultArea = getResultArea(containers.dog, "result-area");
      let img = resultArea.querySelector(".dog-image");

      if (!img) {
        img = document.createElement("img");
        img.classList.add("dog-image");
        resultArea.appendChild(img);
      }

      img.src = data.message;
      img.alt = "Random Dog";
    } catch (error) {
      setError(containers.dog, error.message);
    }
  }

  async function getGitHubUser() {
    const username = prompt("Enter a GitHub username:");
    if (!username) return;

    try {
      const data = await fetchJson(
        `${API_URLS.githubUserBase}/${encodeURIComponent(username)}`,
        "User not found. Please try again.",
      );

      const resultArea = getResultArea(containers.githubUser, "result-area");
      resultArea.innerHTML = `
        <h3>${data.login}</h3>
        <img
          class="github-avatar"
          src="${data.avatar_url}"
          alt="Avatar of ${data.login}"
        />
        <p>Public Repositories: ${data.public_repos}</p>
        <p>Followers: ${data.followers}</p>
        <p>Following: ${data.following}</p>
      `;
    } catch (error) {
      setError(containers.githubUser, error.message);
    }
  }

  async function getJoke() {
    try {
      const data = await fetchJson(
        API_URLS.randomJoke,
        "Could not fetch a joke.",
      );

      const resultArea = getResultArea(containers.joke, "result-area");
      resultArea.innerHTML = `
        <h3>Random Joke</h3>
        <p>${data.setup}</p>
        <p><em>${data.punchline}</em></p>
      `;
    } catch (error) {
      setError(containers.joke, error.message);
    }
  }

  function getMeetups() {
    setError(
      containers.meetup,
      "Meetup API integration needs OAuth setup. Add your endpoint and token to enable this feature.",
    );
  }

  async function getTrendingMovies() {
    if (API_KEYS.tmdb === "YOUR_TMDB_API_KEY") {
      setError(
        containers.trendingMovies,
        "Add your TMDB API key in script.js first.",
      );
      return;
    }

    try {
      const data = await fetchJson(
        `${API_URLS.trendingMoviesBase}?api_key=${API_KEYS.tmdb}`,
        "Could not fetch trending movies.",
      );

      const resultArea = getResultArea(
        containers.trendingMovies,
        "result-area",
      );
      const moviesList = document.createElement("ul");

      data.results.slice(0, 8).forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        moviesList.appendChild(listItem);
      });

      resultArea.innerHTML = "<h3>Trending Movies</h3>";
      resultArea.appendChild(moviesList);
    } catch (error) {
      setError(containers.trendingMovies, error.message);
    }
  }

  async function getWeather() {
    const city = prompt("Enter a city name:");
    if (!city) return;

    try {
      const geocodeData = await fetchJson(
        `${API_URLS.weatherGeocodeBase}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
        "City not found. Please try again.",
      );

      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error("City not found. Please try again.");
      }

      const location = geocodeData.results[0];
      const forecastData = await fetchJson(
        `${API_URLS.weatherForecastBase}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`,
        "Could not fetch weather forecast.",
      );

      const currentTemp = forecastData.current?.temperature_2m;
      const currentWeatherCode = forecastData.current?.weather_code;
      const currentCondition = getWeatherDescription(currentWeatherCode);
      const currentEmoji = getWeatherEmoji(currentWeatherCode);
      const dailyDates = forecastData.daily?.time || [];
      const dailyWeatherCodes = forecastData.daily?.weather_code || [];
      const dailyMax = forecastData.daily?.temperature_2m_max || [];
      const dailyMin = forecastData.daily?.temperature_2m_min || [];

      const forecastItems = dailyDates
        .map((date, index) => {
          const dayLabel = new Date(date).toLocaleDateString(undefined, {
            weekday: "short",
          });
          const dayCode = dailyWeatherCodes[index];
          const dayEmoji = getWeatherEmoji(dayCode);
          const dayCondition = getWeatherDescription(dayCode);
          return `<li>${dayEmoji} ${dayLabel}: ${dailyMin[index]}°C - ${dailyMax[index]}°C (${dayCondition})</li>`;
        })
        .join("");

      const resultArea = getResultArea(containers.weather, "result-area");
      resultArea.innerHTML = `
        <h3>Weather in ${location.name}${location.country ? `, ${location.country}` : ""}</h3>
        <p>Current Temperature: ${currentTemp} °C</p>
        <p>Conditions: ${currentEmoji} ${currentCondition}</p>
        <h4>3-Day Forecast</h4>
        <ul>${forecastItems}</ul>
        <p><small>Legend: ☀️ clear · 🌤️ partly cloudy · ☁️ cloudy · 🌫️ fog · 🌧️ rain · ❄️ snow · ⛈️ storm</small></p>
      `;
    } catch (error) {
      setError(containers.weather, error.message);
    }
  }

  function wireEvents() {
    buttons.cat.addEventListener("click", getCatImage);
    buttons.currency.addEventListener("click", getCurrencyRates);
    buttons.dog.addEventListener("click", getDogImage);
    buttons.githubUser.addEventListener("click", getGitHubUser);
    buttons.joke.addEventListener("click", getJoke);
    buttons.meetup.addEventListener("click", getMeetups);
    buttons.trendingMovies.addEventListener("click", getTrendingMovies);
    buttons.weather.addEventListener("click", getWeather);
  }

  // Init
  wireEvents();
});
