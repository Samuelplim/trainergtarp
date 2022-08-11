import React from "react";
import "./styles.css";
const Status = {
  0: "iniciar",
  1: "falha",
  2: "ocultar",
};

export default function AlertPopUp({ alertText, status }) {
  return (
    <div className={`alertContainer ${Status[status]}`}>
      <p>{alertText}</p>
    </div>
  );
}
