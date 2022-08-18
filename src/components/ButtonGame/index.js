import React from "react";

import "./styles.css";
export default function ButtonGame({ srcPng, onPress }) {
  return (
    <div className="butGame" onClick={onPress}>
      <img src={srcPng} alt="Clique para iniciar" />
    </div>
  );
}
