import Search from './Search';
import landingImage from '../assets/image_landing.svg'
import '../App.scss';

export default function Landing() {
  

  return (
    <>
    <Search />
    
    <div className='landing_text'>
    <img 
          src={landingImage} 
          alt="sound icon" 
          className='landing_image'
        />
        <span className='landing_text_sub1'>Don't get caught in the wind.</span>
        <span className='landing_text_sub2'>Get Sunny.</span>
    </div>
    
    </>
  );
}


