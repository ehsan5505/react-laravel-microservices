import React, { Component } from "react";
import Wrapper from "../Wrapper";

class CreateUser extends Component {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
  role_id: number = 1;

  submit() {
    console.info(
      this.firstName +
        " | " +
        this.lastName +
        " | " +
        this.email +
        " | " +
        this.password +
        " | " +
        this.password_confirmation +
        " | " +
        this.role_id
    );
  }

  render(): React.ReactNode {
    return (
      <Wrapper>
        <div className="col-md col-md-5">
          <form>
            <input
              type="text"
              className="form-control"
              name="first_name"
              placeholder="Please Enter First Name"
              onChange={(e) => (this.firstName = e.target.value)}
            />
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Please Enter Last Name"
              onChange={(e) => (this.lastName = e.target.value)}
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Please Enter Email Address"
              onChange={(e) => (this.email = e.target.value)}
            />
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Please Enter the Password"
              onChange={(e) => (this.password = e.target.value)}
            />
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              placeholder="Please Enter the Confirmation Password"
              onChange={(e) => (this.password_confirmation = e.target.value)}
            />

            <select name="role_id">
              <option key="1" value="1">
                Admin
              </option>
            </select>

            <button className="btn btn-col-md-2">Create User</button>
          </form>
        </div>
      </Wrapper>
    );
  }
}


export default CreateUser;