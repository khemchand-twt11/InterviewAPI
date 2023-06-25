// Countdown.jsx
import React from "react";
import { useState, useEffect } from "react";

const Countdown = ({ handleSubmit }) => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(30);
  const [isTimeOver, setIsTimeOver] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setIsTimeOver(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    if (isTimeOver) {
      handleSubmit();
    }
  }, [isTimeOver]);

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <h1 className="text-lg font-bold">Time over</h1>
      ) : (
        <h1 className="text-lg font-bold">
          Timer : {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Countdown;
