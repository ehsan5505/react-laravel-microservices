import React, { PropsWithRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserProps from "../classes/user";

const Nav = (props: PropsWithRef<any>) => {
  let menu;

  if (props.user.first_name) {
    menu = (
      <>
        <Link to={"/stats"} className="btn text-white">
          Stats
        </Link>
        <Link to={"/rankings"} className="btn text-white">
          Rankings
        </Link>
        <Link to={"/profile"} className="btn text-white">
          {props.user.first_name}
        </Link>
        <Link
          to={"/login"}
          onClick={() => localStorage.clear()}
          className="btn text-white"
        >
          Logout
        </Link>
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
    <nav className="navbar navbar-dark bg-dark box-shadow">
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
