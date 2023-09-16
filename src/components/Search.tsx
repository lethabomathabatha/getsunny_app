import { useState } from 'react';

import '../App.scss';

export default function Search() {
  const [location, setLocation] = useState<string>('');
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const apiKeyPositionstack = '8dffbdec1cdc02cc5b5e2cbfb62bdb69';
  const apiKeyOpenWeatherMap = '4d3cdd60814fc80ba5dc03352851748f';



  const handleSearch = async () => {
    
    // convert data in degrees to compass direction to get wind direction
    function degreesToCompassDirection(degrees : number) {
        const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round((degrees % 360) / 22.5);
        return compassDirections[(index + 16) % 16];
      }
    
    try {
      // get geolocation data using geolocation api
      const response1 = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${apiKeyPositionstack}&query=${location}`,{redirect: 'manual'}
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
        const humidity =  weatherData.main.humidity;

        
        // display wind direction as compass direction
        const windDegree = weatherData.wind.deg; 
        const windDirection = degreesToCompassDirection(windDegree);
         
        setWeatherInfo(`
          Location: ${location}
          <br>Temperature: ${temperature}°C
          <br>Condition: ${description}
          <br>Wind Speed: ${wind} km/h ${windDirection}
          <br>Precipitation: ${humidity}% 
          `);

        // get current date as day of the week and month
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const day = currentDate.getDate();
        const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
            
        // Format the date and time as a string
        const newFormattedDate = `${dayOfWeek},  ${day} ${month} ${year}`;
        setFormattedDate(newFormattedDate);

          
        } else {
            setWeatherInfo('Location not found.');
        }
    } catch (error) {
      console.error('Error:', error);
    }

  

  };

  return (
    <div>
      {/* <label htmlFor="locationInput">Enter Location:</label> */}
      <input
        className='location_input'
        type="text"
        id="locationInput"
        placeholder="Enter a city or location" 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button id="searchButton" onClick={handleSearch}>
        Get Weather
      </button>

      <div>
        <p className='location_name'>{location}</p>
        <p className='location_name'>{formattedDate}</p>
      </div>
      <div id="weatherInfo" dangerouslySetInnerHTML={{ __html: weatherInfo || '' }}></div>      
    </div>
  );
}


