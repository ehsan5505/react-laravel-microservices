import React, { PropsWithChildren } from "react";
import Head from "next/head";

const Wrapper = (props: PropsWithChildren<any>) => {
  return (
    <div className="container bg-light">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        />
      </Head>
      {props.children}
    </div>
  );
};

export default Wrapper;
