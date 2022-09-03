import React from "react";
import "./styles.css";

export default function AlertPopUp({ alertText }) {
  return (
    <div className={`alertContainer`}>
      <p>{alertText}</p>
    </div>
  );
}
