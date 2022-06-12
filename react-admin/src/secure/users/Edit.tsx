import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import Role from "../classes/role";
import Wrapper from "../Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { withRouter } from "react-router";

interface EditUserProps {
  match: PropsWithRef<any>;
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

  componentDidMount = () => {
    console.log(this.props.match);
    // console.log(this.props);
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
    let { id } = useParams();
    console.info(id);
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

export default withRouter(EditUser);
