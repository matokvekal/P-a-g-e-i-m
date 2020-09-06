import { useEffect } from 'react';
export default function useOnClickOutside(ref) {
   useEffect(() => {
       const listener = event => {
          debugger
         // Do nothing if clicking ref's element or descendent elements
         if (ref.current && !ref.current.contains(event.target)) {
          alert("You clicked outside of me!");
                 }
 
         handler(event);
       };
 
       document.addEventListener('mousedown', listener);
       document.addEventListener('touchstart', listener);
 
       return () => {
         document.removeEventListener('mousedown', listener);
         document.removeEventListener('touchstart', listener);
       };
     },

     [ref]
   );
 }