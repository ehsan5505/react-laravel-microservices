import React from "react";
import "./App.css";
import Dashboard from "./secure/dashboard";
import User from "./secure/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./public/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/user"} element={<User />} />
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
