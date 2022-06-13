import React from "react";
import "./App.css";
import Dashboard from "./secure/dashboard/Dashboard";
import User from "./secure/users/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";
import CreateUser from "./secure/users/Create";
import EditUser from "./secure/users/Edit";
import Role from "./secure/roles/Role";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/users"} element={<User />} />
          <Route path={"/users/create"} element={<CreateUser />} />
          <Route path={`/users/:id/edit`} element={<EditUser/>} />
          <Route path={`/roles`} element={<Role />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
