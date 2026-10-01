import React, { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(Date.now());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      function countdownTimer(expiryDate) {
        if (expiryDate === null) {
          return("null")
        }
        else {  
          let millisLeft = expiryDate - time;

          if (millisLeft < 0) {
            millisLeft = 0;
          }
          if (millisLeft === null) {
            millisLeft = 0;
          }
          
          let secondsLeft = millisLeft / 1000
          let minutesLeft = secondsLeft / 60
          let hoursLeft = minutesLeft / 60
    
          let secondsText = Math.floor(secondsLeft) % 60;
          let minutesText = Math.floor(minutesLeft) % 60;
          let hoursText = Math.floor(hoursLeft);
    
          if (minutesText.toString().length < 2) {
            minutesText = minutesText.toString().padStart(2, '0')
          }
          if (secondsText.toString().length < 2) {
            secondsText = secondsText.toString().padStart(2, '0')
          }
          
          return(`${hoursText}h ${minutesText}m ${secondsText}s`)
        }
      }
    return (
        <>{countdownTimer(expiryDate)}</>
    );
}

export default Countdown;