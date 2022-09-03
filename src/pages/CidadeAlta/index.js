import React, { useContext, useEffect, useState } from "react";

import ProgressBarTime from "../../components/ProgressBarTime";
import ViewDigitoGame from "../../components/ViewDigitoGame";
import ButtonGame from "../../components/ButtonGame";
import AlertsPopUp from "../../components/AlertsPopUp";
import { TimerContext } from "../../Hooks/useTimer";

import pnglockpick from "../../assets/lockpick.png";
import pngtnt from "../../assets/tnt.png";

import "./styles.css";

const Status = {
  inicial: 0,
  ok: 1,
  falha: 2,
};
const AlertsPopUpProps = {
  iniciar: "Aperte espaço para inicar o jogo",
  falha: "Voce morreu, pressione espaço para recomeçar",
  ocultar: "",
  falhaTempo: "Lento demais, pressione espaço para recomeçar",
};
/*caso 0 - Jogo não iniciado 
caso 1 - perdeu
caso 2 - jogando
*/

export default function CidadeAlta() {
  const [arrayDigitos, setArrayDigitos] = useState([]);
  const [posicaoArray, setPosicaoArray] = useState(0);
  const [casesGame, setCasesGame] = useState(0);
  const [alertText, setAlertText] = useState("");
  const [statusDigitos, setStatusDigitos] = useState([]);

  const { seg, mudarTimer, keyPress } = useContext(TimerContext);

  const preencherArray = () => {
    return new Promise((resolve) => {
      let result = [];
      const digitos = ["A", "S", "D", "Q", "W", "E"];
      // tamanho 8 digitos
      // preenche o ArrayAleatoriamente

      for (let index = 0; index < 8; index++) {
        let resul = Math.floor(Math.random() * (6 - 0) + 0);
        if (digitos[resul] !== result[index - 1]) {
          result.push(digitos[resul]);
        } else {
          index--;
        }
      }
      setArrayDigitos(result);
      resolve(result);
    });
  };

  const verificarPosicaoAtual = () => {
    console.log(arrayDigitos);
    console.log(posicaoArray);
    console.log(
      "tecla pressionada: " + keyPress + "Array: " + arrayDigitos[posicaoArray]
    );

    if (keyPress === arrayDigitos[posicaoArray]) {
      // Quando acertar
      setStatusDigitos((ex) =>
        ex.map((value, index) => {
          if (index === posicaoArray) {
            return 1;
          }
          return value;
        })
      );
      setPosicaoArray((ex) => ex + 1);
    } else {
      //Quando errar
      setStatusDigitos((ex) =>
        ex.map((value, index) => {
          if (index === posicaoArray) {
            return 2;
          }
          return value;
        })
      );
      setCasesGame(1);
    }
  };

  const iniciarJogo = async () => {
    await preencherArray();
    setStatusDigitos([0, 0, 0, 0, 0, 0, 0, 0]);
    setPosicaoArray(0);
    setCasesGame(0);
    setAlertText("Aperte espaço para iniciar");
  };

  useEffect(() => {
    if (keyPress === " " && casesGame === 0) {
      setCasesGame(2);
      mudarTimer(true);
      setAlertText("");
    }
    if (arrayDigitos.length > 7 && casesGame === 2) {
      verificarPosicaoAtual();
    }
  }, [keyPress]);

  useEffect(() => {
    if (seg > 5 || casesGame === 1) {
      //perdeu
      setAlertText("Você morreu pressione novamente na bomba");
      mudarTimer(false);
    }
  }, [seg, casesGame]);

  return (
    <div id="cidadealta">
      <p>{"Tecla presionada: " + keyPress}</p>
      <p>{arrayDigitos}</p>
      <h1>Cidade Alta</h1>
      <section className="menuGame">
        <ButtonGame srcPng={pnglockpick} />
        <ButtonGame srcPng={pngtnt} onPress={iniciarJogo} />
      </section>

      <section className="wrapperGame">
        <div className="wrapperArrayGame">
          {arrayDigitos.length > 1
            ? arrayDigitos.map((digito, index) => {
                return (
                  <ViewDigitoGame
                    key={index}
                    digito={digito}
                    status={statusDigitos[index]}
                  />
                );
              })
            : true}
        </div>
        <div className="wrapperTimer">
          <ProgressBarTime count="5" />
        </div>
        <AlertsPopUp alertText={alertText} />
      </section>
    </div>
  );
}
