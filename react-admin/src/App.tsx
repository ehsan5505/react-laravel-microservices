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
import Product from "./secure/products/Product";
import CreateProduct from "./secure/products/Create";
import EditProduct from "./secure/products/Edit";
import Order from "./secure/order/Order";
import OrderItems from "./secure/order/OrderItems";
import Profile from "./secure/profile/profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/users"} element={<User />} />
          <Route path={"/users/create"} element={<CreateUser />} />
          <Route path={`/users/:id/edit`} element={<EditUser />} />
          <Route path={`/roles`} element={<Role />} />
          <Route path={`/roles/create`} element={<CreateRole />} />
          <Route path={`/roles/:id/edit`} element={<EditRole />} />
          <Route path={`/products`} element={<Product />} />
          <Route path={`/products/create`} element={<CreateProduct />} />
          <Route path={`/products/:id/edit`} element={<EditProduct />} />
          <Route path={`/orders`} element={<Order />} />
          <Route path={`/orders/:id`} element={<OrderItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
