import { useState } from 'react';
import searchIcon from '../assets/icon_search.svg'
import searchIconBlack from '../assets/icon_search_black.svg'
// import WeatherData from './WeatherData';
import '../App.scss';

export default function Search() {
  const [location, setLocation] = useState<string>('');
  const [isInputFieldVisible, setIsInputFieldVisible] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const apiKeyPositionstack = '';
  const apiKeyOpenWeatherMap = '';


  const handleSearchField = () => {
    setIsInputFieldVisible(!isInputFieldVisible);
  }

  const handleSearch = async () => {
    console.log(apiKeyPositionstack)
    
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
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeatherMap}`
        );
        const weatherData = await response2.json();

        // display weather data
        const temperature = Math.round(weatherData.main.temp - 273.15); // convert from Kelvin to Celsius
        const description = weatherData.weather[0].description;
        const wind = Math.round(weatherData.wind.speed);
        const humidity =  weatherData.main.humidity;
        const visibility = weatherData.visibility;

        // display wind direction as compass direction
        const windDegree = weatherData.wind.deg; 
        const windDirection = degreesToCompassDirection(windDegree);

      
        // get current date as day of the week and month
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const day = currentDate.getDate();
        const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
            
        // Format the date and time as a string
        const newFormattedDate = `${dayOfWeek},  ${day} ${month} ${year}`;
        setFormattedDate(newFormattedDate);

        const weatherInfoResults = `
        Location: ${location}
        Temperature: ${temperature}°C
        Condition: ${description}
        Wind Speed: ${wind} km/h ${windDirection}
        Precipitation: ${humidity}%
        Visibility: ${visibility} km
        Date: ${formattedDate}
      `;

        setWeatherInfo(weatherInfoResults);
        } else {
            setWeatherInfo('Location not found.');
        }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  return (
    <div className='mobile-container'>
      
      <div className='search_container'>
      {isInputFieldVisible ? (
          <>
            <input
              className='location_input'
              type="text"
              id="locationInput"
              placeholder="Enter a city or location"
              value={location}
              style={{ height: '50px' }}
              onChange={(e) => setLocation(e.target.value)}
            />
            {/* Display the black search icon when input field is visible */}
            <img
              style={{ height: '40px' }}
              onClick={handleSearch}
              src={searchIconBlack}
              alt="sound icon"
              className='search_icon_black'
            />
          </>
        ) : (
          <>
            {/* Display the white search icon when input field is not visible */}
            <img
              src={searchIcon}
              alt="sound icon"
              className='search_icon'
              onClick={handleSearchField}
              style={{ cursor: 'pointer' }}
            />
          </>
        )}
      </div>

      <div className="weatherInfoContainer">
        {/* render search results as h1 items */}
        {weatherInfo && (
          <h1>{weatherInfo}</h1>
        )}
      </div>
      
    </div>
  );
}


