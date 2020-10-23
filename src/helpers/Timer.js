import React, { useState, useEffect } from "react";
import timer from './timer.css';

const Timer = (props) => {
   const TIME_LIMIT = 5;
   const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
   const isActive=props.isActive;
   const setTimerDown=props.setTimerDown;

   const FULL_DASH_ARRAY = 283;
   const WARNING_THRESHOLD = 10;
   const ALERT_THRESHOLD = 5;

   const COLOR_CODES = {
      info: {
         color: "green"
      },
      warning: {
         color: "orange",
         threshold: WARNING_THRESHOLD
      },
      alert: {
         color: "red",
         threshold: ALERT_THRESHOLD
      }
   };

   let timerInterval = null;
   let remainingPathColor = COLOR_CODES.info.color;

   useEffect(() => {
      if (!timeLeft) return ;
   
      const interval = setInterval(() => {
         setTimeLeft(seconds => seconds - 1);
         setTimerDown(timeLeft-1);
         setCircleDasharray();
        setRemainingPathColor(timeLeft-1);
      }, 1000);
      return () => clearInterval(interval);
   }, [timeLeft,isActive]);






   function setRemainingPathColor(timeLeft) {
      const { alert, warning, info } = COLOR_CODES;
      if (timeLeft <= alert.threshold) {
         document
            .getElementById("timerRemain")
            .classList.remove(warning.color);
         document
            .getElementById("timerRemain")
            .classList.add(alert.color);
      } else if (timeLeft <= warning.threshold) {
         document
            .getElementById("timerRemain")
            .classList.remove(info.color);
         document
            .getElementById("timerRemain")
            .classList.add(warning.color);
      }
   }

   function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
   }

   function setCircleDasharray() {
      const circleDasharray = `${(
         calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
         .getElementById("timerRemain")
         .setAttribute("stroke-dasharray", circleDasharray);
   }

   return (
      <div id="app">
         <div className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 400 400" >
               <g className="base-timer__circle">
                  {/* <circle className="timerelapsed" cx="10" cy="10" r="15"></circle> */}
                  <path
                     id="timerRemain"
                     stroke-dasharray="283"
                     className={`timerCirsle ${remainingPathColor}`}
                     d="
             M 50, 50
             m -45, 0
             a 45,45 0 1,0 90,0
             a 45,45 0 1,0 -90,0
           "
                  ></path>
               </g>
            </svg>
            <span id="base-timer-label" className="baseTimer">{timeLeft}</span>
         </div>
      </div>
   )
}


export default Timer;