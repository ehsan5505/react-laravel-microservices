import axios from "axios";
import React, { Component } from "react";
import PermissionProps from "../classes/permission";
import Wrapper from "../Wrapper";

class CreateRole extends Component {
  name = "";
  selected: number[] = [];
  state = {
    redirect: false,
    permissions: [],
  };

  componentDidMount = async () => {
    const response = await axios.get("permissions");
    this.state.permissions = response.data;
  };

  render() {
    console.info(this.state.permissions);
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

          {this.state.permissions.map((p: any) => {
            return (
              <p>
                {p.id} | {p.name}
              </p>
            );
          })}

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="option1"
            />

            <label className="form-check-label" htmlFor="inlineCheckbox1">
              1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              value="option3"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              3 (disabled)
            </label>
          </div>
        </form>
      </Wrapper>
    );
  }
}

export default CreateRole;
