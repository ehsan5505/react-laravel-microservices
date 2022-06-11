import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Nav extends Component {

  state = {
    redirect: false;
  }
  signOut = () => {
    localStorage.clear();
    this.setState({
      redirect: true
    })
  } 
  render() {
    if (this.state.redirect) return <Navigate to="/login" />
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">
          Company name
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" onClick={this.signOut}>
              Sign out
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
