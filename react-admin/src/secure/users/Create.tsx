import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios, { AxiosError } from "axios";
import RoleProps from "../classes/role";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import constant from "../../config_const";

class CreateUser extends Component {
  firstName = "";
  lastName = "";
  email = "";
  password = "";
  passwordConfirmation = "";
  roleId = 1;

  state = {
    roles: [],
    redirect: false,
  };

  // Gather the roles detail
  componentDidMount = async () => {
    const resp = await axios.get(`${constant.BASE_URL}/roles`);
    this.setState({ roles: resp.data.data });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${constant.BASE_URL}/users`, {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        role_id: this.roleId,
      });

      this.setState({
        redirect: true,
      });

      toast.success("User Created Successfully");
    } catch (err) {
      const errors = err as any | AxiosError;
      if (axios.isAxiosError(err)) {
        toast.error(errors.response.data.message);
      }
    }
  };

  render(): React.ReactNode {
    if (this.state.redirect) {
      return <Navigate to="/users" />;
    }
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
              <select
                className="form-select"
                name="role_id"
                onChange={(e) => (this.roleId = parseInt(e.target.value))}
              >
                {this.state.roles.map((role: RoleProps) => {
                  return (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  );
                })}
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
