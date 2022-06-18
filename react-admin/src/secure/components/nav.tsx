import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import UserProps from "../classes/user";
class Nav extends Component {
  state = {
    redirect: false,
    user: new UserProps(),
  };

  signOut = () => {
    localStorage.clear();
    this.setState({
      redirect: true,
    });
  };

  componentDidMount = async () => {
    const resp = await axios.get("user");
    const userDetail: UserProps = resp.data.data;
    this.setState({
      user: userDetail,
    });
    console.info(userDetail);
  };

  render() {
    if (this.state.redirect) return <Navigate to="/login" />;
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
          className="form-control form-control-dark w-80 rounded-0 border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="col-md-2">
          <div className="">
            <div className="">
              <Link to={"/profile"} className="">
                {this.state.user.first_name}
              </Link>
              <a className="nav-link " onClick={this.signOut}>
                Sign out
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Nav;
