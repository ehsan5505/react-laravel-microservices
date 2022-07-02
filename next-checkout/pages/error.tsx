import React from "react";
import Wrapper from "../components/Wrapper";

const Error = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Error</h2>
          <p className="lead">Could not process the payment!</p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Error;
