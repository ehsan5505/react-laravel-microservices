import React from "react";
import './Register.css';

const Register = () => (
  <section className="text-center text-lg-start">
    
    <div className="container py-4">
      <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div
            className="card cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="htmlForm-outline">
                    <input
                      type="text"
                      id="htmlForm3Example1"
                      className="htmlForm-control"
                    />
                    <label
                      className="htmlForm-label"
                      htmlFor="htmlForm3Example1"
                    >
                      First name
                    </label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="htmlForm-outline">
                    <input
                      type="text"
                      id="htmlForm3Example2"
                      className="htmlForm-control"
                    />
                    <label
                      className="htmlForm-label"
                      htmlFor="htmlForm3Example2"
                    >
                      Last name
                    </label>
                  </div>
                </div>
              </div>

              <div className="htmlForm-outline mb-4">
                <input
                  type="email"
                  id="htmlForm3Example3"
                  className="htmlForm-control"
                />
                <label className="htmlForm-label" htmlFor="htmlForm3Example3">
                  Email address
                </label>
              </div>

              <div className="htmlForm-outline mb-4">
                <input
                  type="password"
                  id="htmlForm3Example4"
                  className="htmlForm-control"
                />
                <label className="htmlForm-label" htmlFor="htmlForm3Example4">
                  Password
                </label>
              </div>

              <div className="htmlForm-check d-flex justify-content-center mb-4">
                <input
                  className="htmlForm-check-input me-2"
                  type="checkbox"
                  value=""
                  id="htmlForm2Example33"
                  checked
                />
                <label
                  className="htmlForm-check-label"
                  htmlFor="htmlForm2Example33"
                >
                  Subscribe to our newsletter
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign up
              </button>

              <div className="text-center">
                <p>or sign up with:</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-google"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-twitter"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0">
          <img
            src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
            className="w-100 rounded-4 shadow-4"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
);

export default Register;