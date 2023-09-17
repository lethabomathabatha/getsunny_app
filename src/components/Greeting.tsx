import { useEffect, useRef, useState } from 'react';
import whiteSunIcon from '../assets/icon_sunny_small_black.svg';
import blackMoonIcon from '../assets/icon_moon_small_black.svg'


export default function Greeting() {
  const [greeting, setGreeting] = useState<string>('');
  const [icon, setIcon] = useState<string | null>(null);

  const greetingRef = useRef<string>('');

  useEffect(() => {
    const time = new Date().getHours();
    if (time >= 3 && time < 12) {
      greetingRef.current = 'Good Morning';
      setIcon(whiteSunIcon); 
    } else if (time >= 12 && time < 18) {
      greetingRef.current = 'Good Afternoon';
      setIcon(whiteSunIcon);
    } else if (time >= 18 && time < 24) {
      greetingRef.current = 'Good Evening';
      setIcon(blackMoonIcon);
    } else {
      greetingRef.current = 'Good Night';
      setIcon(blackMoonIcon);
    }
    setGreeting(greetingRef.current);
  }, []);

  return (
    <div className=''>
      <div className=''>
        <span className=''>{greeting}</span>
        {icon && <img src={icon} style={{ width: '20px', paddingBottom: '15px' }}  alt='icon' />} 
      </div>
    </div>
  );
}
