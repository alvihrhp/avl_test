import React from "react";
/** React Router */
import { Routes, Route, Link } from "react-router-dom";
/** Screens */
import { Login, Register } from "./screens";

interface Props {}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
