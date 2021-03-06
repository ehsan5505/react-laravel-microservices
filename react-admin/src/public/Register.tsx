import React, { Component, SyntheticEvent } from "react";
import "./Register.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import constant from "../config_const";

class Register extends Component {
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  password_confirm = "";
  state = ({
    redirect: false
  });

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post(
      `${constant.USER_URL}/register`,
      {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirm,
      }
    );
    this.setState({
      redirect: true
    });

  };
  render() {
    // Redirect if already registerd
    if(this.state.redirect)
      return <Navigate to="/login" />

    return (
      <section>
        <div className="px-4 py-5 px-md-5 text-center text-lg-start">
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="my-5 display-3 fw-bold ls-tight">
                  Welcome To Be <br />
                  <span className="text-primary">The Part Of The Team...</span>
                </h1>
                <p className="para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div className="card-body py-5 px-md-5">
                    <form onSubmit={this.submit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="firstName"
                              className="form-control"
                              onChange={(e) =>
                                (this.firstName = e.target.value)
                              }
                            />
                            <label className="form-label" htmlFor="FirstName">
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control"
                              onChange={(e) => (this.lastName = e.target.value)}
                            />
                            <label className="form-label" htmlFor="lastName">
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          onChange={(e) => (this.email = e.target.value)}
                        />
                        <label className="form-label" htmlFor="email">
                          Email address
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          onChange={(e) => (this.password = e.target.value)}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-control"
                          onChange={(e) =>
                            (this.password_confirm = e.target.value)
                          }
                        />
                        <label className="form-label" htmlFor="confirmPassword">
                          Password Confirmation
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
