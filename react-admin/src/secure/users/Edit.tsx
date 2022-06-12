import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import { RouteProps } from "react-router-dom";
import Role from "../classes/role";
import Wrapper from "../Wrapper";

interface EditUserProps {
  match: PropsWithRef<any>;
}
class EditUser extends Component<any,any> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    roleId: 3,
    roles: [],
    redirect: false,
  };

  componentDidMount = () => {
    console.log(this.props);
    // const id = this.props.params
    // const id = route.params.id;
    // console.log( this.props.route.params );
  };

  submit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.lastName,
      role_id: this.state.roleId,
    });
  };

  render() {
    console.log(this.props);
    // let { id } = this.props.match.params:;
    // console.info(id);
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
                onChange={(e) => (this.state.firstName = e.target.value)}
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
                onChange={(e) => (this.state.lastName = e.target.value)}
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
                onChange={(e) => (this.state.email = e.target.value)}
              />
            </div>

            <div className="mb-4">
              <select
                className="form-select"
                name="role_id"
                onChange={(e) => (this.state.roleId = parseInt(e.target.value))}
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

export default EditUser;
