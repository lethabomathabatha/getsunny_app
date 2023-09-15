import { useState } from 'react';
import './App.scss';

export default function App() {
  const [location, setLocation] = useState<string>('');
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);

  const apiKeyPositionstack = '8dffbdec1cdc02cc5b5e2cbfb62bdb69';
  const apiKeyOpenWeatherMap = '4d3cdd60814fc80ba5dc03352851748f';



  const handleSearch = async () => {
    try {
      // get geolocation data using geolocation api
      const response1 = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${apiKeyPositionstack}&query=${location}`
      );

      if (!response1.ok) {
        throw new Error('HTTP request failed. ${response1.status}');
      }

      const data1 = await response1.json();

      if (data1 && data1.data && data1.data.length > 0) {
        const { latitude, longitude } = data1.data[0];

        // use latitiude and longitude data from geolocation api to get weather data from weather api
        const response2 = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeatherMap}`,{redirect: 'manual'}
        );
        const weatherData = await response2.json();

        // display weather data
        const temperature = Math.round(weatherData.main.temp - 273.15); // convert from Kelvin to Celsius
        const description = weatherData.weather[0].description;
        const wind = Math.round(weatherData.wind.speed);
        // const humidity =  weatherData.main.humidity;
        setWeatherInfo(`
          Location: ${location}
          <br>Temperature: ${temperature}°C
          <br>Condition: ${description}
          <br>Wind Speed: ${wind} km/h 
         
          `);
      } else {
        setWeatherInfo('Location not found.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label htmlFor="locationInput">Enter Location:</label>
      <input
        type="text"
        id="locationInput"
        placeholder="Enter a city or location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button id="searchButton" onClick={handleSearch}>
        Get Weather
      </button>
      <div id="weatherInfo" dangerouslySetInnerHTML={{ __html: weatherInfo || '' }}></div>

      <p>Welcome to GetSunny.</p>
    </div>
  );
}


