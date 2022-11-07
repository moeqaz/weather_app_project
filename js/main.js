var myAPIKey = "vgfhghfhnhjghhhjfjggfjvjb";

{
    let form = document.getElementById('city');
    console.log(form);

    async function handleSubmit(e){
        e.preventDefault();
        console.log(e);
        let cityName = e.target.cityName.value;
        console.log(cityName);
        let cityWeather = await getCityWeather(cityName);
        console.log(cityWeather);
        buildCityInfo(cityWeather);

        e.target.cityName.value = '';
    }
    
    
    async function getCityWeather(cityName){
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myAPIKey}`);
        let data = await res.json();
        return data;
    }

    function buildCityInfo(cityObj){
        let card = document.createElement('div');
        card.className = 'card w-100 text-center bg-dark text-info';

        let image = document.createElement('img');
        image.className = 'card-img-top w-100';
        image.innerHTML = cityObj.weather[0].icon;
        card.append(image);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cityTitle = document.createElement('h2');
        cityTitle.className = 'card-title';
        cityTitle.innerHTML = cityObj.name;

        let cityForecast = document.createElement('h4');
        cityForecast.className = 'card-text';
        cityForecast.innerHTML = cityObj.weather[0].main;

        let cityCurrent = document.createElement('h6');
        cityCurrent.className = 'card-text';
        cityCurrent.innerHTML = `Current: ${((cityObj.main.temp - 273.15) * (1.8) + 32).toFixed(1)}\u00B0F`;

        let cityFeelsLike = document.createElement('h6');
        cityFeelsLike.className = 'card-text';
        cityFeelsLike.innerHTML = `Feels-like: ${((cityObj.main.feels_like - 273.15) * (1.8) + 32).toFixed(1)}\u00B0F`;
    
        let cityLow = document.createElement('h6');
        cityLow.className = 'card-text';
        cityLow.innerHTML = `Low: ${((cityObj.main.temp_min - 273.15) * (1.8) + 32).toFixed(1)}\u00B0F`

        let cityHigh = document.createElement('h6');
        cityHigh.className = 'card-text';
        cityHigh.innerHTML = `High: ${((cityObj.main.temp_max - 273.15) * (1.8) + 32).toFixed(1)}\u00B0F`

        cardBody.append(cityTitle);
        cardBody.append(cityForecast);
        cardBody.append(cityCurrent);
        cardBody.append(cityFeelsLike);
        cardBody.append(cityLow);
        cardBody.append(cityHigh);

        card.append(cardBody);

        let col = document.createElement('div');
        col.className = 'w-100 my-3';

        col.append(card);

        let display = document.getElementById('WeatherByCity');
        display.append(col);
    }
    
    
    form.addEventListener('submit', handleSubmit);
}