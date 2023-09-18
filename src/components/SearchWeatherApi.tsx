import { useState } from 'react';
import searchIcon from '../assets/icon_search.svg';
import windIcon from '../assets/icon_wind.svg'
import precipitationIcon from '../assets/icon_precipitation.svg'
import visibilityIcon from '../assets/icon_visibility.svg'
import searchIconBlack from '../assets/icon_search_black.svg';
import landingImage from '../assets/Amigos - Outdoors.svg'
import '../App.scss';


// interface SearchWeatherApiProps {
//   onWeatherInfoChange: (weatherInfo: string | null, location: string | null) => void;
// }

export default function SearchWeatherApi() {
  const [location, setLocation] = useState<string>('');
  const [isInputFieldVisible, setIsInputFieldVisible] = useState<boolean>(false);
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null); 
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);  
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
      const visibility = weatherData.visibility / 1000;
      const windDegree = weatherData.wind.deg;
      const windDirection = degreesToCompassDirection(windDegree);

      const currentDate = new Date();
      const month = currentDate.toLocaleString('default', { month: 'long' });
      const day = currentDate.getDate();
      const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });

      const newFormattedDate = `${dayOfWeek},  ${day} ${month}`;


    //  use results to render the weather data to the screen
       const weatherInfoResults = (
        <>
        <div className='weather_data_container'> 
            <div className='weather_location'>
                
                <p className='location_name'>{location}</p>
            </div>

            <div className='weather_date'>
                <span className='weather_info_date'>{newFormattedDate}</span>
            </div>

            <div className='weather_condition'>
                <span className=''>{description}</span>
            </div>
    
            <div className='weather_temperature'>
                <p className='weather_temp_number'>{temperature}</p>
                <p className='weather_temp_celcius'>°C</p>
            </div>

        
            <div className='weather_details'>
                <div className='weather_details_category'>
                    <img src={windIcon} alt="wind icon" className='weather_details_icon'/>
            
                    <span className='weather_category_value'>{wind}km/h {windDirection}</span>
                    <span className='weather_category_text'>Wind</span>
                </div>

                <div className='weather_details_category'>
                    <img src={precipitationIcon} alt="precipitation icon" className='weather_details_icon'/>
                    <span className='weather_category_value'>{humidity}%</span>
                    <span className='weather_category_text'>Precipitation</span>
                </div>

                <div className='weather_details_category'>
                    <img src={visibilityIcon} alt="precipitation icon" className='weather_details_icon'/>
                    <span className='weather_category_value'>{visibility}km</span>
                    <span className='weather_category_text'>Visibility</span>
                </div>
            </div>
        </div>

        </>
      );

      setWeatherInfo(weatherInfoResults); 

      // pass weather info to parent component
    //   onWeatherInfoChange(weatherInfoResults, location);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error:', error);

    
    }
  };

  function degreesToCompassDirection(degrees: number) {
    const compassDirections = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ];
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

      <div className="weather_data_container">
        {searchPerformed ? (
          weatherInfo ? (
            <>{weatherInfo}</>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          // initial message before user performs a search
          <div className='landing_container'>
            <div className='landing_text'>
              <span className='landing_text_sub1'>Don't get caught in the wind.</span>
              <br />
              <span className='landing_text_sub2'>Get Sunny.</span>
            </div>

            <img
              src={landingImage}
              alt="sound icon"
              className='landing_image'
            />
          </div>
        )}
      </div>
    </div>
  );
}