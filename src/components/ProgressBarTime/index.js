import React from "react";
import { useContext } from "react";
import { TimerContext } from "../../Hooks/useTimer";
import "./styles.css";

export default function ProgressBarTime() {
  //cout = 0s
  //Tempo atual do cronometro
  const { seg } = useContext(TimerContext);

  return (
    <div className="progress-bar">
      <span style={{ width: `${seg * 20}%` }}></span>
      <p>Tempo do jogo: {seg}s</p>
    </div>
  );
}
