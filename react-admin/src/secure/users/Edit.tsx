import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import Role from "../classes/role";
import Wrapper from "../Wrapper";
import { useParams } from "react-router-dom";
import axios from "axios";
import User from "./Users";

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

class EditUser extends Component<any, any> {
  firstName = "";
  lastName = "";
  email = "";
  roleId = "";
  state = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 3,
    roles: [],
    redirect: false,
  };

  componentDidMount = async () => {
    const { id } = this.props.params;
    console.warn(id);
    const res = await axios.get("/roles");
    const rolesData = res.data.data;
    const resp = await axios.get(`/users/` + id);
    const userData: UserProps = resp.data.data;
    this.setState({
      roles: rolesData,
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
      roleId: userData.role.id,
    });
    // console.info(rolesData);
    // console.info(usersData);
  };

  submit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      role_id: this.state.roleId,
    });
  };

  render() {
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
                defaultValue={this.state.firstName}
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
                defaultValue={this.state.lastName}
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
                defaultValue={this.state.email}
                onChange={(e) => (this.email = e.target.value)}
              />
            </div>

            <div className="mb-4 col-md-4">
              <select
                className="form-select"
                name="role_id"
                value={this.state.roleId}
                onChange={(e) => (
                  (this.state.roleId = parseInt(e.target.value)),
                  (this.roleId = e.target.value)
                )}
              >
                {this.state.roles.map((role: Role) => {
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
export default (props: PropsWithRef<any>) => (
  <EditUser {...props} params={useParams()} />
);
// export default (EditUser);
