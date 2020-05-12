import { useEffect } from 'react';

const useLockBodyScroll = () => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Prevent scrolling on mount
    return () => {
      document.body.style.overflow = 'visible'
    };
   }, []);
   
};

export default useLockBodyScroll;