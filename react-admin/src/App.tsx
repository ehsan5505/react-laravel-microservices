import React from "react";
import "./App.css";
import Dashboard from "./components/dashboard";
import Menu from "./components/menu";
import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Dashboard/>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
