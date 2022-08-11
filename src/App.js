import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CidadeAlta from "./pages/CidadeAlta";

import { TimerProvider } from "./Hooks/useTimer";

export default function App() {
  return (
    <TimerProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="cidadealta" element={<CidadeAlta />} />
      </Routes>
    </TimerProvider>
  );
}
