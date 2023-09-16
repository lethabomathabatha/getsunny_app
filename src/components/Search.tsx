import { useState } from 'react';
// import SearchOutlined from '@mui/icons-material/SearchOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import searchIcon from '../assets/icon_search.svg'
import '../App.scss';

export default function Search() {
  const [location, setLocation] = useState<string>('');
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const apiKeyPositionstack = '';
  const apiKeyOpenWeatherMap = '';



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
         

        // rather have this under return()
        setWeatherInfo(`
          Location: ${location}
          <br>Temperature: ${temperature}°C
          <br>Condition: ${description}
          <br>Wind Speed: ${wind} km/h ${windDirection}
          <br>Precipitation: ${humidity}% 
          <br>Visibility: ${visibility} km
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
    <div className='mobile-container'>
      
      <div className='search_container'>
        <input
          
          className='location_input'
          type="text"
          id="locationInput"
          placeholder="Enter a city or location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}   
        /> 
        <img 
          src={searchIcon} 
          alt="sound icon" 
          className='search_icon'
          onClick={handleSearch}
        />

        

      </div>

      <div id="weatherInfoContainer">
        {/* Render the weather information */}
        {weatherInfo && (
          <div className='weather_info'>
            <p className='location_name'>{location}</p>
            <p>{formattedDate}</p>
            <div dangerouslySetInnerHTML={{ __html: weatherInfo }}></div>
          </div>
        )}
      </div>
      
      
      

    
        {/*
            1. seperate search bar and weather info
            2. place search functionality in Search.tsx and weather info in WeatherDetails.txs  
        
        */}
      {/* <div className='weather_info'>
        <p className='location_name'>{location}</p>
        <p className='weather_info_date'>{formattedDate}</p>
        <span className='weather_info_condition'>{description}</span>

        <div className='weather_info_temperature'>
            <span className='weather_info_temp_number'>{temperature}</span>
            <span className='weather_info_temp_celcius'>{temperature}</span>
        </div>

        <div className='weather_info_conditions'>
            <div className='weather_info_wind'>
                <span className='weather_info_wind_speed'>{wind}{windDirection}</span>
                <span className='weather_info_wind_text'>Wind</span>
            </div> 

            <div className='weather_info_precipitation'>
                <span className='weather_info_precip_percentage'>{humidity}%</span>
                <span className='weather_info_precip_text'>Precipitation</span>
            </div> 

            <div className='weather_info_visibility'>
                <span className='weather_info_vis_distance'>{visibility} km</span>
                <span className='weather_info_wind_text'>Wind</span>
            </div> 
        </div>
      </div> */}


    </div>
  );
}


