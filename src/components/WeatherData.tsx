// import { useState } from 'react';
// import '../App.scss';
import '../components/WeatherData.scss'
// import searchIcon from '../assets/icon_search.svg'
import windIcon from '../assets/icon_wind.svg'
import precipitationIcon from '../assets/icon_precipitation.svg'
import visibilityIcon from '../assets/icon_visibility.svg'
import soundOnIcon from '../assets/icon_soundOn.svg'
// import soundOffIcon from '../assets/icon_soundOff.svg'


export default function WeatherData() {
//   const [location, setLocation] = useState<string>('');
//   const [weatherInfo, setWeatherInfo] = useState<string | null>(null);
//   const [formattedDate, setFormattedDate] = useState<string | null>(null);
//   const apiKeyPositionstack = '';
//   const apiKeyOpenWeatherMap = '';

// console.log(apiKeyOpenWeatherMap)
// console.log(apiKeyPositionstack)

//   const handleSearch = async () => {
    
//     // convert data in degrees to compass direction to get wind direction
//     function degreesToCompassDirection(degrees : number) {
//         const compassDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
//         const index = Math.round((degrees % 360) / 22.5);
//         return compassDirections[(index + 16) % 16];
//       }
    
//     try {
//       // get geolocation data using geolocation api
//       const response1 = await fetch(
//         `http://api.positionstack.com/v1/forward?access_key=${apiKeyPositionstack}&query=${location}`,{redirect: 'manual'}
//       );

//       if (!response1.ok) {
//         throw new Error('HTTP request failed. ${response1.status}');
//       }

//       const data1 = await response1.json();

//       if (data1 && data1.data && data1.data.length > 0) {
//         const { latitude, longitude } = data1.data[0];

//         // use latitiude and longitude data from geolocation api to get weather data from weather api
//         const response2 = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeatherMap}`,{redirect: 'manual'}
//         );
//         const weatherData = await response2.json();

//         // display weather data
//         const temperature = Math.round(weatherData.main.temp - 273.15); // convert from Kelvin to Celsius
//         const description = weatherData.weather[0].description;
//         const wind = Math.round(weatherData.wind.speed);
//         const humidity =  weatherData.main.humidity;
//         const visibility = weatherData.visibility;

//         // display wind direction as compass direction
//         const windDegree = weatherData.wind.deg; 
//         const windDirection = degreesToCompassDirection(windDegree);
         

//         // rather have this under return()
//         setWeatherInfo(`
//           Location: ${location}
//           <br>Temperature: ${temperature}°C
//           <br>Condition: ${description}
//           <br>Wind Speed: ${wind} km/h ${windDirection}
//           <br>Precipitation: ${humidity}% 
//           <br>Visibility: ${visibility} km
//           `);

//         // get current date as day of the week and month
//         const currentDate = new Date();
//         const year = currentDate.getFullYear();
//         const month = currentDate.toLocaleString('default', { month: 'long' });
//         const day = currentDate.getDate();
//         const dayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
            
//         // Format the date and time as a string
//         const newFormattedDate = `${dayOfWeek},  ${day} ${month} ${year}`;
//         setFormattedDate(newFormattedDate);

//         } else {
//             setWeatherInfo('Location not found.');
//         }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

  return (
    <div className='weather_data_container'>
      

      <div className='weather_location'>
        <img src={soundOnIcon} alt="sound icon" className='weather_sound_icon'/>

        <p className='location_name'>Pretoria</p>
      </div>

      <div className='weather_date'>
        <span className='weather_info_date'>Monday, 18 September</span>
      </div>

      <div className='weather_condition'>
        <span className=''>Sunny</span>
      </div>
    
      <div className='weather_temperature'>
        <p className='weather_temp_number'>29</p>
        <p className='weather_temp_celcius'>°C</p>
      </div>

        {/* weather deatils section */}
      <div className='weather_details'>
        <div className='weather_details_category'>
            <img src={windIcon} alt="wind icon" className='weather_details_icon'/>
       
            <span className='weather_category_value'>6km/h</span>
            <span className='weather_category_text'>Wind</span>
        </div>

        <div className='weather_details_category'>
            <img src={precipitationIcon} alt="precipitation icon" className='weather_details_icon'/>
            <span className='weather_category_value'>80%</span>
            <span className='weather_category_text'>Precipitation</span>
        </div>

        <div className='weather_details_category'>
            <img src={visibilityIcon} alt="precipitation icon" className='weather_details_icon'/>
            <span className='weather_category_value'>80km</span>
            <span className='weather_category_text'>Visibility</span>
        </div>
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


