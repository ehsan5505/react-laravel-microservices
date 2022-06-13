import React, { Component } from "react";
import Wrapper from "../Wrapper";

class CreateRole extends Component {
  name = "";
  selected: number[] = [];
  state = {
    redirect: false,
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
            <input
              type="checkbox"
              className="form-control-checkbox"
              id="permission"
              value="1"
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

export default CreateRole;
