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
import CreateRole from "./secure/roles/Create";
import EditRole from "./secure/roles/Edit";

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
          <Route path={`/users/:id/edit`} element={<EditUser />} />
          <Route path={`/roles`} element={<Role />} />
          <Route path={`/roles/create`} element={<CreateRole />} />
          <Route path={`/roles/:id/edit`} element={<EditRole />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
