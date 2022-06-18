import React, { Component, Dispatch, PropsWithChildren } from "react";
import Menu from "./components/menu";
import Nav from "./components/nav";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProps from "./classes/user";
import setUser from "../redux/actions/setUserActions";
import { connect } from "react-redux";

class Wrapper extends Component<PropsWithChildren<any>> {
  state = {
    redirect: false,
  };

  componentDidMount = async () => {
    try {
      const user = await axios.get("user");
      this.props.setUser(user.data.data);
    } catch (e) {
      this.setState({ redirect: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/login" />;
    }
    return (
      <>
        <ToastContainer />
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              {this.props.children}
            </main>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: UserProps) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
