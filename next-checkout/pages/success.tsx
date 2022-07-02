import React from "react";
import Wrapper from "../components/Wrapper";
import { useRouter } from "../node_modules/next/router";

const Success = () => {

  const router = useRouter();
  const {source} = router.query;
  console.info(source);

  return (
    <Wrapper>
      <div className="container">
        <div className="py-5 text-center">
          <h2>Success</h2>
          <p className="lead">Your purchase has been completed!</p>
        </div>
      </div>
    </Wrapper>
  );
};
export default Success;
