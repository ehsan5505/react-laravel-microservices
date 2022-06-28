import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";

const Wrapper = (props:PropsWithChildren<any>) => {
  return (
    <>
    <Nav/>
      <main role="main">
        <Header/>

        {props.children}

        <ToastContainer />
      </main>
    </>
  )
}

export default Wrapper;