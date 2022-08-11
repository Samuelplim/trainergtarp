import React from "react";

import { useContext } from "react";
import { TimerContext } from "../../Hooks/useTimer";

import ProgressBarTime from "../../components/ProgressBarTime";
import ViewDigitoGame from "../../components/ViewDigitoGame";
import AlertPopUp from "../../components/AlertsPopUp";

import pnglockpick from "../../assets/lockpick.png";
import pngtnt from "../../assets/tnt.png";

import "./styles.css";

const Status = {
  inicial: 0,
  ok: 1,
  falha: 2,
};
const ArrayDigitosProps = {
  value: "",
  status: Status,
};
const AlertsPopUpProps = {
  iniciar: "Aperte espaço para inicar o jogo",
  falha: "Voce morreu, pressione espaço para recomeçar",
  ocultar: "",
  falhaTempo: "Lento demais, pressione espaço para recomeçar",
};

export default function CidadeAlta() {
  const [ArrayDigitos, SetArrayDigitos] = React.useState([ArrayDigitosProps]);
  const [AlertOn, setAlertOn] = React.useState(false);
  const [AlertState, setAlertState] = React.useState("");
  const [PosicaoArray, setPosicaoArray] = React.useState(-1);

  const { seg, mudarTimer } = useContext(TimerContext);

  function caixaeletronico() {
    // tamanho 8 digitos
    // Disparo ao clicar na bomba
    let result = [];
    const digitos = ["A", "S", "D", "Q", "W", "E"];
    for (let index = 0; index < 8; index++) {
      let resul = Math.floor(Math.random() * (6 - 0) + 0);
      result.push({
        value: digitos[resul],
        status: Status.inicial,
      });
    }
    SetArrayDigitos(result); //Array
    // Abrir alerta
    setAlertOn(true);
    setAlertState(AlertsPopUpProps.iniciar);
  }

  function verificarPosicaoAtual(keyPress) {
    if (keyPress === ArrayDigitos[PosicaoArray].value) {
      // Quando acertar
      let newList = ArrayDigitos;
      newList[PosicaoArray].status = Status.ok;
      SetArrayDigitos(newList);
      setPosicaoArray(PosicaoArray + 1);
    } else {
      //Quando errar
      let newList = ArrayDigitos;
      newList[PosicaoArray].status = Status.falha;
      SetArrayDigitos(newList); // Altera o status do digito que errou

      setAlertState(AlertsPopUpProps.falha);
      setAlertOn(true); //ativa o alerta de falha

      mudarTimer(false); //Parar o UserTime
      setPosicaoArray(-2);
    }
  }

  function onKey(e) {
    let keyPress = e.key.toUpperCase();
    if (keyPress === " " && PosicaoArray === -2) {
      //reiniciar o jogo
      caixaeletronico();
      mudarTimer(true);
      setAlertState("");
      setAlertOn(false);
      setPosicaoArray(0);
    }
    if (keyPress === " " && PosicaoArray === -1) {
      //Disparar inicio do jogo
      mudarTimer(true);
      setAlertState("");
      setAlertOn(false);
      setPosicaoArray(0);
    }
    if (PosicaoArray >= 0 && PosicaoArray < 8) {
      verificarPosicaoAtual(keyPress);
    }

    window.removeEventListener("keydown", onKey);
  }

  React.useEffect(() => {
    window.addEventListener("keydown", onKey);
    if (seg === 5) {
      setAlertState(AlertsPopUpProps.falhaTempo);
      setAlertOn(true); //ativa o alerta de falha

      mudarTimer(false); //Parar o UserTime
      setPosicaoArray(-2);
    }
    console.log(seg);
  });
  return (
    <div id="cidadealta">
      <h1>Cidade Alta</h1>
      <section className="menuGame">
        <div>
          <button className="butGame">
            <img src={pnglockpick} alt="Caixa eletrônico" />
          </button>
        </div>
        <div>
          <button className="butGame" onClick={caixaeletronico}>
            <img src={pngtnt} alt="Roubo de loja" />
          </button>
        </div>
      </section>

      {AlertOn ? (
        <AlertPopUp status={"iniciar"} alertText={AlertState} />
      ) : (
        true
      )}

      <section className="wrapperGame">
        <div className="wrapperArrayGame">
          {ArrayDigitos.map((digito, index) => {
            return (
              <ViewDigitoGame
                key={index}
                digito={digito.value}
                status={digito.status}
              />
            );
          })}
        </div>
        <ProgressBarTime count="5" />
      </section>
    </div>
  );
}
