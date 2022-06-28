import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navbar navbar-dark bg-dark box-shadow">
      <div className="container d-flex justify-content-between">
        <Link to={"/"} className="navbar-brand my-0 mr-md auto font-weight-normal">Influencer</Link>
        <Link to={"/login"} className="btn btn-outline-primary">Login</Link>
      </div>
    </div>
  );
};

export default Nav;
