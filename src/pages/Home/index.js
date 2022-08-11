import * as React from "react";
import { Link } from "react-router-dom";

import pngCidadeAlta from "../../assets/2.png";
import pngNopixel from "../../assets/1.png";

import "./styles.css";

export default function Home() {
  return (
    <div className="container">
      <section className="wrappertitle">
        <h1>Treine sua habilidade aqui!</h1>
        <h2>Escolha o servidor.</h2>
      </section>
      <section className="wrapper">
        <div className="cardImage">
          <Link to="cidadealta" className="text-link">
            <img src={pngCidadeAlta} alt="Cidade Alta" />
            <p>Cidade Alta</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
