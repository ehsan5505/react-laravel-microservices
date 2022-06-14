import React from "react";
import Dashboard from "../dashboard/Dashboard";
import User from "../users/Users";
import { NavLink } from "react-router-dom";

const Menu = () => (
  <nav
    id="sidebarMenu"
    className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div className="position-sticky pt-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to={"/"} className="nav-link" aria-current="page">
            <span data-feather="home" className="align-text-bottom"></span>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/users"} className="nav-link" aria-current="page">
            <span data-feather="home" className="align-text-bottom"></span>
            Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/roles"} className="nav-link" aria-current="page">
            <span data-feather="home" className="align-text-bottom"></span>
            Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/products"} className="nav-link" aria-current="page">
            <span data-feather="home" className="align-text-bottom"></span>
            Products
          </NavLink>
        </li>

      </ul>
    </div>
  </nav>
);

export default Menu;
