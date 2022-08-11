import React from "react";
import "./styles.css";
const Status = {
  0: "inicial",
  1: "ok",
  2: "falha",
};
export default function ViewDigitoGame({ digito, status }) {
  return (
    <div className={`digitocontainer ${Status[status]}`}>
      <span>{digito}</span>
    </div>
  );
}
