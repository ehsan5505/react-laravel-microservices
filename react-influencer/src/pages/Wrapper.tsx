import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

const Wrapper = (props:PropsWithChildren<any>) => {
  return (
    <>
    <Nav/>
      <main role="main">
        <Header/>

        {props.children}

        
      </main>
    </>
  )
}

export default Wrapper;