function fetchCountryData() {
    var search = document.getElementById("countrySearch").value.trim();

    var url = `https://restcountries.com/v3.1/name/${search}`;

    fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        displayCountries(data);
    });
}

function displayCountries(data) {
    var mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var country = data[i];

        var card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag">
            <h3>${country.name.common}</h3>

            <div class="details">
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population}</p>
            </div>

            <div class="weather"></div>

            <button onclick="showDetails(this)">More Details</button>
            <button onclick="findWeather(this, '${country.capital}')">Find Weather</button>
        `;

        mainContent.appendChild(card);
    }
}

function showDetails(button) {
    var card = button.parentElement;
    var detailsDiv = card.querySelector(".details");

    if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
        detailsDiv.style.display = "block";
        button.textContent = "Hide Details";
    } else {
        detailsDiv.style.display = "none";
        button.textContent = "More Details";
    }
}

function findWeather(button, cityName) {
    var weatherDiv = button.parentElement.querySelector(".weather");

    var weatherApiKey = "45abb3b6bd3ccf9c8f774149d21bfb5d"; 
    
    
    // <-- PUT your OpenWeather key here
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`;

    fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        weatherDiv.style.display = "block";
        weatherDiv.innerHTML = `
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        `;
    });
}
