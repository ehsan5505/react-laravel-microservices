import React, { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import config from "../config_const";
import axios from "../node_modules/axios/index";
import { useRouter } from "../node_modules/next/router";

const Success = () => {
  const router = useRouter();
  const { source } = router.query;

  useEffect(() => {
    if (source !== undefined) {
      async () => {
        await axios.post(`${config.endpoint}/orders/confirm`, {
          source: source,
        });
      };
    }
  }, [source]);

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
