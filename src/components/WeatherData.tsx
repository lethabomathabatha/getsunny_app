// import { useState } from 'react';
import '../App.scss';
import '../components/WeatherData.scss'
// import searchIcon from '../assets/icon_search.svg'
// import windIcon from '../assets/icon_wind.svg'
// import precipitationIcon from '../assets/icon_precipitation.svg'
// import visibilityIcon from '../assets/icon_visibility.svg'
// import soundOnIcon from '../assets/icon_soundOn.svg'
// import Search from './Search';
import Greeting from './Greeting';
import SearchWeatherApi from './SearchWeatherApi';



export default function WeatherData() {
  // accept props from the SearchWeatherApi component


  return (
    <div className='main_container'>
      <Greeting />
      <SearchWeatherApi />

    
    {/* Note: this code has been copied to the SearchWeatherApi component */}
    {/* <div className='weather_data_container'> 
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
    </div> */}
    </div>
  );
}


