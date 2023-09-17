import { useEffect, useRef, useState } from 'react';
import './App.scss';

export default function Greeting() {
   // time-based greeting message
   const [greetingIcon, setGreetingIcon] = useState()

   // using useRef vs regular variable stores the greeting without forcing too many re-renders
   const greetingRef = useRef<string>(''); 
 
   useEffect(() => {
     const time = new Date().getHours();
     if (time >= 3 && time < 12) {
       greetingRef.current = `Good Morning`;
       setGreetingIcon()
     } else if (time >= 12 && time < 18) {
       greetingRef.current = `Good Afternoon`;
       setGreetingIcon()
     } else if (time >= 18 && time < 24) {
       greetingRef.current = `Good Evening`;
       setGreetingIcon()
     } else {
       greetingRef.current = `Good Night`;
       setGreetingIcon()
     }
   }, []);

  return (
    <div className=''>
      
      <div className=''>
      <span className=''>{greetingRef.current}{greetingIcon}</span>
      </div>
      
    </div>
  );
}


