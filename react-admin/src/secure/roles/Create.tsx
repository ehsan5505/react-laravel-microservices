import axios from "axios";
import React, { Component } from "react";
import PermissionProps from "../classes/permission";
import Wrapper from "../Wrapper";

class CreateRole extends Component {
  name = "";
  selected: number[] = [];
  state = {
    permissions: [],
    redirect: false,
  };

  componentDidMount = async () => {
    const response = await axios.get("permissions");
    this.state.permissions = response.data.data;
    console.info(response.data);
  };

  render() {
    return (
      <Wrapper>
        <form>
          <div className="form-outline form-white mb-4">
            <label htmlFor="name" className="form-label">
              Role Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Please Enter Roll Name"
              onChange={(e) => (this.name = e.target.value)}
            />
          </div>
          <div className="form-outline form-white mb-4">
            <label htmlFor="permission" className="form-label-checkbpx">
              Permissions
            </label>
          </div>

          {this.state.permissions.map((p: PermissionProps) => {
            return (
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={p.id}
                />
                <label className="form-check-label">{p.name}</label>
              </div>
            );
          })}
        </form>
      </Wrapper>
    );
  }
}

export default CreateRole;
