import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";

class CreateUser extends Component {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  passwordConfirmation: string = "";
  role_id: number = 1;

  submit(e: SyntheticEvent) {
    e.preventDefault();
    console.info(
      this.firstName +
        " | " +
        this.lastName +
        " | " +
        this.email +
        " | " +
        this.password +
        " | " +
        this.passwordConfirmation +
        " | " +
        this.role_id
    );
  }

  render(): React.ReactNode {
    return (
      <Wrapper>
        <div className="mb-4">
          <form onSubmit={this.submit}>
            <div className="form-outline form-white mb-4">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Please Enter First Name"
                onChange={(e) => (this.firstName = e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="form-control"
                placeholder="Please Enter Last Name"
                onChange={(e) => (this.lastName = e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Please Enter Email Address"
                onChange={(e) => (this.email = e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Please Enter the Password"
                onChange={(e) => (this.password = e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                className="form-control"
                placeholder="Please Enter the Confirmation Password"
                onChange={(e) => (this.passwordConfirmation = e.target.value)}
              />
            </div>

            <div className="mb-4">
              <select className="form-select" name="role_id">
                <option key="1" value="1">
                  Admin
                </option>
              </select>
            </div>

            <input
              type="submit"
              className="btn btn-primary float-right"
              value="Create User"
            />
          </form>
        </div>
      </Wrapper>
    );
  }
}

export default CreateUser;
