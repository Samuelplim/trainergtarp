import React from "react";
import { useContext } from "react";
import { TimerContext } from "../../Hooks/useTimer";
import "./styles.css";

export default function ProgressBarTime() {
  //cout = 0s
  //Tempo atual do cronometro
  const { isRunning, seg } = useContext(TimerContext);

  return (
    <div className="progress-bar">
      <span
        style={{ animation: `${isRunning ? "loading" : 0} 5s linear` }}
      ></span>
      <p>Tempo do jogo: {seg}s</p>
    </div>
  );
}
