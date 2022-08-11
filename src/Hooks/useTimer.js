import React from "react";

export const TimerContext = React.createContext();

export const TimerProvider = ({ children }) => {
  const [seg, setSeg] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(0);
  const [boolInit, setBoolInit] = React.useState(false);

  const mudarTimer = (bool) => {
    setBoolInit(bool);
  }; //Função para mudar o estado do cronometro

  React.useEffect(() => {
    if (boolInit === true) {
      if (intervalId) {
        clearInterval(intervalId);
        setInterval(0);
        return;
      }
      const newintervalId = setInterval(() => {
        setSeg((prevSS) => prevSS + 1);
      }, 1000);
      setIntervalId(newintervalId); //função executada a cada 1s
    }
    if (boolInit === false) {
      const newIntervalId = clearInterval(intervalId);
      setIntervalId(newIntervalId);
      setSeg(0);
    }
  }, [boolInit]);

  return (
    <TimerContext.Provider value={{ seg, mudarTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
