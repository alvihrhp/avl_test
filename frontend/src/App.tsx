import React from "react";
/** React Router */
import { Routes, Route, Link } from "react-router-dom";
/** Screens */
import { Login } from "./screens";

interface Props {}

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
