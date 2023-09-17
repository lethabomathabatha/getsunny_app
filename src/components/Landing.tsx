import Search from './Search';
import landingImage from '../assets/image_landing.svg'
import '../App.scss';

export default function Landing() {
  

  return (
    <div className='main_container'>
    <Search />
    
        <div className='landing_container'>
         <img 
          src={landingImage} 
          alt="sound icon" 
          className='landing_image'
        />
        <div className='landing_text'>
            <span className='landing_text_sub1'>Don't get caught in the wind.</span>
            <br />
            <span className='landing_text_sub2'>Get Sunny.</span>  
        </div>
        
       
        </div>
        
    
    </div>
  );
}


