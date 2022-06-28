import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Login from "./public/Login";
import Register from "./public/Register";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path={"/"} element={<Main />} />
        <Route path={"/login"} element={<Login /> } />
        <Route path={"/register"} element={<Register />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
