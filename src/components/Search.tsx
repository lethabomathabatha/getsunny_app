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
  const apiKeyOpenWeatherMap = '';
  const apiKeyNeutrino = '';
  const userId = 'getsunny'
  const handleSearchField = () => {
    setIsInputFieldVisible(!isInputFieldVisible);
  }

  const handleSearch = () => {
    console.log(location);
  
    // convert data in degrees to compass direction to get wind direction
    function degreesToCompassDirection(degrees: number) {
      const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
      const index = Math.round((degrees % 360) / 22.5);
      return compassDirections[(index + 16) % 16];
    }
  
    fetch(
      `https://neutrinoapi.com/geocode-address?user-id=${userId}&api-key=${apiKeyNeutrino}&address=${location}`
    )
      .then((geocodeResponse: Response) => {
        if (!geocodeResponse.ok) {
          throw new Error(`Geocoding request failed with status: ${geocodeResponse.status}`);
        }
        return geocodeResponse.json();
      })
      .then((geocodeData) => {
        if (geocodeData.location && geocodeData.location.latitude && geocodeData.location.longitude) {
          const latitude = geocodeData.location.latitude;
          const longitude = geocodeData.location.longitude;
  
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeatherMap}`)
            .then((weatherResponse) => {
              if (!weatherResponse.ok) {
                throw new Error(`Weather request failed with status: ${weatherResponse.status}`);
              }
              return weatherResponse.json();
            })
            .then((weatherData) => {
              const temperature = Math.round(weatherData.main.temp - 273.15); // convert from Kelvin to Celsius
              const description = weatherData.weather[0].description;
              const wind = Math.round(weatherData.wind.speed);
              const humidity = weatherData.main.humidity;
              const visibility = weatherData.visibility;
              const windDegree = weatherData.wind.deg;
              const windDirection = degreesToCompassDirection(windDegree);
  
              const currentDate = new Date();
              const year = currentDate.getFullYear();
              const month = currentDate.toLocaleString('default', { month: 'long' });
              const day = currentDate.getDate();
              const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
  
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
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        } else {
          setWeatherInfo('Location not found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
              style={{ height: '30px', cursor: 'pointer' }}
              onClick={handleSearch}
              src={searchIconBlack}
              alt="sound icon"
              className='search_icon_black'
            />
          </>
        ) : (
          <>
            {/* Display the orange search icon when input field is not visible */}
            <img
              src={searchIcon}
              alt="search icon"
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


