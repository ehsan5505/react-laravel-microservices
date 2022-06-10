import React from "react";
import "./App.css";
import Dashboard from "./secure/dashboard";
import User from "./secure/user";
import Menu from "./secure/components/menu";
import Nav from "./secure/components/nav";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <BrowserRouter>
              <Route path={"/"}  element={Dashboard} />
              <Route path={"/user"} element={User} />
            </BrowserRouter>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
