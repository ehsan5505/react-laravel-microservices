import React, { PropsWithRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserProps from "../classes/user";

const Nav = (props: PropsWithRef<any>) => {
  let menu;

  if (props.user.first_name) {
    menu = (
      <>
        {/* <nav className="my-2 my-md-0 mr-md-3"> */}
        <Link to={"/stats"} className="btn btn-outline-primary">
          Stats
        </Link>
        <Link to={"/rankings"} className="btn btn-outline-primary">
          Rankings
        </Link>
        <Link to={"/profile"} className="btn btn-outline-primary">
          {props.user.first_name}
        </Link>
        {/* </nav> */}

        <Link
          to={"/login"}
          onClick={() => localStorage.clear()}
          className="btn btn-outline-primary"
        >
          Logout
        </Link>
      </>
    );
  } else {
    menu = (
      <Link to={"/login"} className="btn btn-outline-primary">
        Login
      </Link>
    );
  }

  return (
    <div className="navbar navbar-dark bg-dark box-shadow">
      <div className="container d-flex justify-content-between">
        <Link
          to={"/"}
          className="navbar-brand my-0 mr-md auto font-weight-normal"
        >
          Influencer
        </Link>
        {menu}
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Nav);
