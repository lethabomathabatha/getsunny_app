// import landingImage from '../assets/image_landing.svg'
import sunnyLargeOrange from '../assets/icon_sunny_large_orange.svg'
import whiteSunIcon from '../assets/icon_sunny_small_white.svg'
import '../App.scss';

export default function Landing() {
  

  return (
    <div className='background_container'>
        <img 
          src={sunnyLargeOrange} 
          alt="sunny large icon" 
          className='sunny_large_icon'
        />

        <div className='background_weather_location'>
          <p style={{color: 'white', fontSize: '25px'}}>Cape Town </p>
          <img src={whiteSunIcon} alt="white sun icon" className='weather_details_icon'/>
        </div>
       
        <p style={{color: 'white', fontSize: '40px'}}>Cape Town</p>

        <div className='background_weather_location'>
          <p style={{color: 'white', fontSize: '25px'}}>Cape Town </p>
          <img src={whiteSunIcon} alt="white sun icon" className='weather_details_icon'/>
        </div>
    </div>
  );
}


