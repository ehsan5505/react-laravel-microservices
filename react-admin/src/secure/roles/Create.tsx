import axios from "axios";
import React, { Component, SyntheticEvent } from "react";
import PermissionProps from "../classes/permission";
import Wrapper from "../Wrapper";

class CreateRole extends Component {
  name = "";
  selected: number[] = [];
  state = {
    redirect: false,
    permissions: [],
  };

  check = (id: number) => {
    console.log(`ID given in the argunment ${id}`);
    if (this.selected.filter((s) => s === id).length > 0) {
      // if the id already exist then return the exclusive (not selected ones)
      this.selected = this.selected.filter((s) => s !== id);
      // console.error(this.selected);
      return;
    }
    // console.info(this.selected);
    this.selected.push(id);
    // console.info(this.selected);
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // console.log({
    //   name: this.name,
    //   permissions: this.selected,
    // });
  };

  componentDidMount = async () => {
    const response = await axios.get("permissions");
    this.setState({
      permissions: response.data,
    });
  };

  render() {
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
                  onChange={(e) => {
                    this.check(p.id);
                  }}
                />

                <label className="form-check-label">{p.name}</label>
              </div>
            );
          })}
          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Create Role"
          />
        </form>
      </Wrapper>
    );
  }
}

export default CreateRole;
