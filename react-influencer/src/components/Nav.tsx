import React, { PropsWithRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserProps from "../classes/user";

const Nav = (props: PropsWithRef<any>) => {
  let menu;

  if (props.user.first_name) {
    menu = (
      <>
        {/* <ul className="navbar-nav">
         <li className="nav-item"> */}
        <Link to={"/stats"} className="nav-link">
          Stats
        </Link>
        {/* </li>
         <li className="nav-item"> */}
        <Link to={"/rankings"} className="nav-link">
          Rankings
        </Link>
        {/* </li>
         <li className="nav-item"> */}
        <Link to={"/profile"} className="nav-link">
          {props.user.first_name}
        </Link>
        {/* </li>
         <li className="nav-item"> */}
        <Link
          to={"/login"}
          onClick={() => localStorage.clear()}
          className="nav-link"
        >
          Logout
        </Link>
        {/* </li>
       </ul> */}
      </>
    );
  } else {
    menu = (
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
    );
  }

  return (
    <nav className="navbar navbar-light bg-light box-shadow">
      <div className="container d-flex justify-content-between">
        <Link
          to={"/"}
          className="navbar-brand my-0 mr-md auto font-weight-normal"
        >
          Influencer
        </Link>
        <div className="mr-auto">{menu}</div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Nav);
