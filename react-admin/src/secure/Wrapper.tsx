import React, { Component, PropsWithRef } from "react";
import Menu from "./components/menu";
import Nav from "./components/nav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
interface WrapperProps {
  children: React.ReactNode;
}

class Wrapper extends Component<WrapperProps> {
  state = {
    redirect: false,
  };

  componentDidMount = async () => {
    try {
      const user = await axios.get("user");
      console.info(user);
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

export default (props: PropsWithRef<any>) => (
  <Wrapper {...props} params={useParams()} />
);
// export default Wrapper;
