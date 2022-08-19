import React, { useEffect } from "react";

export const TimerContext = React.createContext();

export const TimerProvider = ({ children }) => {
  const [seg, setSeg] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  const mudarTimer = (bool) => {
    setIsRunning((presBool) => bool);
  }; //Função para mudar o estado do cronometro

  console.log("Segundos now:  " + seg);
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
    <TimerContext.Provider value={{ seg, mudarTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
