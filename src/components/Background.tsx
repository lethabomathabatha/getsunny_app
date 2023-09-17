// import landingImage from '../assets/image_landing.svg'
import sunnyLargeOrange from '../assets/icon_sunny_large_orange.svg'
import '../App.scss';

export default function Landing() {
  

  return (
    <div className='background_container'>
        <img 
          src={sunnyLargeOrange} 
          alt="sunny large icon" 
          className='sunny_large_icon'
        />
        <p style={{color: 'white', fontSize: '40px'}}>Cape Town</p>
        <p style={{color: 'white', fontSize: '40px'}}>Cape Town</p>
        <p style={{color: 'white', fontSize: '40px'}}>Cape Town</p>
    </div>
  );
}


