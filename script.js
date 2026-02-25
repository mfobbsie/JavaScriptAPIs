document.addEventListener("DOMContentLoaded", () => {
  // Config
  const API_KEYS = {
    openWeatherMap: "YOUR_OPENWEATHERMAP_API_KEY",
    tmdb: "YOUR_TMDB_API_KEY",
  };

  const API_URLS = {
    catImage: "https://api.thecatapi.com/v1/images/search",
    currencyBase: "https://open.er-api.com/v6/latest/USD",
    dogImage: "https://dog.ceo/api/breeds/image/random",
    githubUserBase: "https://api.github.com/users",
    randomJoke: "https://official-joke-api.appspot.com/random_joke",
    trendingMoviesBase: "https://api.themoviedb.org/3/trending/movie/week",
    weatherBase: "https://api.openweathermap.org/data/2.5/weather",
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

    if (API_KEYS.openWeatherMap === "YOUR_OPENWEATHERMAP_API_KEY") {
      setError(
        containers.weather,
        "Add your OpenWeatherMap API key in script.js first.",
      );
      return;
    }

    try {
      const data = await fetchJson(
        `${API_URLS.weatherBase}?q=${encodeURIComponent(city)}&appid=${API_KEYS.openWeatherMap}&units=metric`,
        "City not found. Please try again.",
      );

      const resultArea = getResultArea(containers.weather, "result-area");
      resultArea.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
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
