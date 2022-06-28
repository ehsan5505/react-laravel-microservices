import React, { Component, SyntheticEvent } from "react";
import "./Login";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


class Login extends Component {
  email = "";
  password = "";
  state = {
    redirect: false,
    message: ""
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const resp = await axios.post("login", {
        email: this.email,
        password: this.password,
        scope: "influencer"
      });

      this.setState({
        redirect: true,
      });

      localStorage.setItem('token',resp.data.token);
    } catch (err: any) {
      
      this.setState({
        message: err.response.data.error
      });
    }
  };

  render() {
    if (this.state.redirect) return <Navigate to="/" />;

    return (
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <strong className="text-danger mb-5">
                      {this.state.message}
                    </strong>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <form onSubmit={this.submit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          onChange={(e) => (this.email = e.target.value)}
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          onChange={(e) => (this.password = e.target.value)}
                        />
                      </div>

                      <input
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        value="Login"
                      />
                    </form>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to={"/register"} className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
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

export default Login;
