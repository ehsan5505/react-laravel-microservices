import axios from "axios";
import React, { Component, PropsWithRef, SyntheticEvent } from "react";
import { Navigate, useParams } from "react-router";
import { toast } from "react-toastify";
import PermissionProps from "../classes/permission";
import RoleProps from "../classes/role";
import Wrapper from "../Wrapper";

class EditRole extends Component<any, any> {
  name = "";
  selected: number[] = [];
  roleId = 0;
  state = {
    redirect: false,
    permissions: [],
    selected: [],
    name: "",
  };

  isChecked = (id: number) => {
    return this.state.selected.filter((s) => s === id).length > 0;
  };
  check = (id: number) => {
    if (this.isChecked(id)) {
      this.selected = this.selected.filter((s) => s !== id);
      return;
    }
    this.selected.push(id);
  };

  componentDidMount = async () => {
    this.roleId = this.props.params.id;
    const permissionCall = await axios.get("permissions");
    const roleCall = await axios.get(`roles/${this.roleId}`);
    const role = roleCall.data;

    this.selected = role.permissions.map((p: PermissionProps) => p.id);

    this.setState({
      permissions: permissionCall.data,
      name: role.name,
      selected: this.selected,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put(`roles/${this.roleId}`, {
        name: this.name,
        permissions: this.selected,
      });

      this.setState({
        redirect: true,
      });
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={"/roles"} />;
    }
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
          <div className="form-outline form-white mb-4">
            <label htmlFor="name" className="form-label">
              Role Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Please Enter Role Name"
              defaultValue={(this.name = this.state.name)}
              onChange={(e) => (this.name = e.target.value)}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="permission" className="form-label-checkbpx">
              Permissions
            </label>
          </div>

          {this.state.permissions.map((p: any) => {
            return (
              <div className="form-check form-check-inline">
                <input
                  key={p.id}
                  className="form-check-input"
                  type="checkbox"
                  value={p.id}
                  defaultChecked={this.isChecked(p.id)}
                  onChange={(e) => this.check(p.id)}
                />
                <label className="form-check-label">{p.name}</label>
              </div>
            );
          })}
          <br />
          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Update"
          />
        </form>
      </Wrapper>
    );
  }
}

// export default EditRole;
export default (props: PropsWithRef<any>) => (
  <EditRole {...props} params={useParams()} />
);
