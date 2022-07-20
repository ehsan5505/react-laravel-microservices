import React, { Dispatch, PropsWithChildren, useEffect } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import UserProps from "../classes/user";
import setUser from "../redux/actions/setUserActions";
import { connect } from "react-redux";
import constant from "../config_const";

const Wrapper = (props: PropsWithChildren<any>) => {
  useEffect(() => {
    try {
      (async () => {
        const response = await axios.get(`${constant.BASE_URL}/user`);
        const user: UserProps = response.data.data;
        props.setUser(
          new UserProps(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.revenue
          )
        );
      })();
    } catch (err) {
      props.setUser(null);
    }
  }, []);

  return (
    <>
      <Nav />
      <main role="main">
        {props.children}

        <ToastContainer />
      </main>
    </>
  );
};

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
