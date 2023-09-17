import { useState } from 'react';
import searchIcon from '../assets/icon_search.svg';
import searchIconBlack from '../assets/icon_search_black.svg';
import '../App.scss';

export default function SearchWeatherApi() {
  const [location, setLocation] = useState<string>('');
  const [isInputFieldVisible, setIsInputFieldVisible] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const apiKeyOpenWeatherMap = '4d3cdd60814fc80ba5dc03352851748f';

  const handleSearchField = () => {
    setIsInputFieldVisible(!isInputFieldVisible);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKeyOpenWeatherMap}`
      );

      if (!response.ok) {
        throw new Error(`Weather request failed with status: ${response.status}`);
      }

      const weatherData = await response.json();

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
        Date: ${newFormattedDate}
      `;

      setWeatherInfo(weatherInfoResults);
    } catch (error) {
      console.error('Error:', error);
      setWeatherInfo('Location not found or an error occurred.');
    }
  };

  function degreesToCompassDirection(degrees: number) {
    const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((degrees % 360) / 22.5);
    return compassDirections[(index + 16) % 16];
  }

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
        {weatherInfo && (
          <pre>{weatherInfo}</pre>
        )}
      </div>
    </div>
  );
}
