import React, { Component } from "react";
import Menu from "./components/menu";
import Nav from "./components/nav";
import axios from "axios";
interface WrapperProps {
  children: React.ReactNode;
}

class Wrapper extends Component<WrapperProps> {
  state = {
    redirect: false,
  };

  componentDidMount = async () => {
    try{
      const user = await axios.get("user",{withCredentials: true});
      console.info(user);
    }catch(e){
      console.error("Error");
    }
  };

  render() { 
    return (
      <>
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

export default Wrapper;
