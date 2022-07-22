import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import constant from "../../config_const";
import UserProps from "../classes/user";
class Nav extends Component<{ user: UserProps }> {
  state = {
    redirect: false,
  };

  signOut = async () => {
    try {
      await axios.post(`${constant.USER_URL}/logout`, {});
      this.setState({
        redirect: true,
      });
      localStorage.clear();
    } catch (err: any) {
      console.warn(err.response.message.data);
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/login" />;
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">
          Microstore | Power Up
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
          <div className="nav">
            <Link to={"/profile"} className="nav-link text-white">
              {this.props.user.full_name}
            </Link>
            <a className="nav-link text-white" onClick={this.signOut}>
              Sign out
            </a>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);
