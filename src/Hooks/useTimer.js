import React, { useEffect, useState, createContext } from "react";
import useEventListener from "@use-it/event-listener";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [seg, setSeg] = useState(0);
  const [keyPress, setKeyPress] = useState(); //Tecla pressionada
  const [isRunning, setIsRunning] = useState(false); //Ativa o timer

  const mudarTimer = (bool) => {
    setIsRunning(bool);
  }; //Função para mudar o estado do cronometro

  useEventListener("keydown", (event) => {
    setKeyPress(() => event.key.toUpperCase());
  });

  useEffect(() => {
    if (isRunning) {
      const newintervalId = window.setInterval(() => {
        setSeg((prevSS) => prevSS + 1);
      }, 1000);
      return () => window.clearInterval(newintervalId);
    } else {
      setSeg(0);
    }
  }, [isRunning]);

  return (
    <TimerContext.Provider value={{ seg, mudarTimer, keyPress, isRunning }}>
      {children}
    </TimerContext.Provider>
  );
};
