import { useLayoutEffect } from 'react';

const useLockBodyScroll = () => {
  
  useLayoutEffect(() => {
   const originalStyle = window.getComputedStyle(document.body).overflow;  // body overflow
   document.body.style.overflow = 'hidden'; // Prevent scrolling on mount
   return () => document.body.style.overflow = originalStyle;
   }, []);
   
};

export default useLockBodyScroll;