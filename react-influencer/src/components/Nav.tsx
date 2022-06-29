import React, { PropsWithRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserProps from "../classes/user";

const Nav = (props: PropsWithRef<any>) => {
  let menu;

  console.info(props.user);
  if (props.user) {
    menu = (
      <>
        <nav className="my-2 my-md-0 mr-md-3">
          <Link
            to={"/login"}
            onClick={() => localStorage.clear()}
            className="p-2 text-dark"
          >
            Logout
          </Link>
        </nav>

        <Link to={"/profile"} className="btn btn-outline-primary">
          {props.user.first_name}
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
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
      {/* <div className="container d-flex justify-content-between"> */}
        <Link
          to={"/"}
          className="navbar-brand my-0 mr-md auto font-weight-normal"
        >
          Influencer
        </Link>
        {menu}
      {/* </div> */}
    </div>
  );
};

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Nav);
