function fetchCountryData() {
    var countryName = document.getElementById("countrySearch").value;
    var url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayCountries(data);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
}

function displayCountries(countries) {
    var main = document.getElementById("mainContent");
    main.innerHTML = "";

    for (var i = 0; i < countries.length; i++) {
        var country = countries[i];

        var card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag">
            <h3>${country.name.common}</h3>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region:</b> ${country.region}</p>
            <button onclick="showWeather('${country.capital ? country.capital[0] : ''}', this)">More Details</button>
        `;

        main.appendChild(card);
    }
}

function showWeather(cityName, btnElement) {
    if (cityName === '') {
        alert("No Capital City found to get weather!");
        return;
    }

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=45abb3b6bd3ccf9c8f774149d21bfb5d
&units=metric`;

    fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(weatherData) {
        var weatherInfo = `
            <p><b>Weather:</b> ${weatherData.weather[0].description}</p>
            <p><b>Temperature:</b> ${weatherData.main.temp} °C</p>
            <p><b>Humidity:</b> ${weatherData.main.humidity}%</p>
            <p><b>Wind Speed:</b> ${weatherData.wind.speed} m/s</p>
        `;

        var card = btnElement.parentElement;
        var extraDiv = document.createElement("div");
        extraDiv.innerHTML = weatherInfo;
        extraDiv.style.marginTop = "10px";
        extraDiv.style.animation = "fadeIn 0.5s ease"; // optional animation
        card.appendChild(extraDiv);

        btnElement.style.display = "none"; // hide button after showing weather
    })
    .catch(function(error) {
        console.log("Error fetching weather:", error);
    });
}
