import React, { PropsWithRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserProps from "../classes/user";

const Header = (props: PropsWithRef<any>) => {
  const [title, setTitle] = useState("Welcome");
  const [description, setDescription] = useState(
    "Earn upto 10% of the product price by referring"
  );
  const [button, setButton] = useState(
    <p>
      <Link to={"/login"} className="btn btn-primary my-2">
        Login
      </Link>
      <Link to={"/register"} className="btn btn-secondary my-2">
        Register
      </Link>
    </p>
  );

  useEffect(() => {
    if (props.user?.id) {
      setTitle("$" + props.user?.revenue);
      setDescription("Total Amount Earned");
      setButton(
        <Link to={"/stats"} className="btn btn-secondary my-2">
          Statistics
        </Link>
      );
    } else {
      setTitle("Welcome");
      setDescription("Earn upto 10% of the product price by referring");
    }
  }, [props]);

  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{title}</h1>
        <p className="lead text-muted">{description}</p>
      </div>
      <span>{button}</span>
    </section>
  );
};
const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Header);
