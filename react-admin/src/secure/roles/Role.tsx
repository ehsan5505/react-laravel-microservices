import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoleProps from "../classes/role";
import Wrapper from "../Wrapper";
import axios from "axios";
import { deleteRecord } from "../helper/function";
import { toast } from "react-toastify";

class Role extends Component {
  state = {
    roles: [],
  };

  componentDidMount = async () => {
    const roles = await axios.get("roles");
    this.setState({
      roles: roles.data.data,
    });
  };

  delete = async (id: number) => {
    if (window.confirm("Are you sure to delete the record?")) {
      try {
        await axios.delete(`roles/${id}`);
        this.state.roles.filter((r: RoleProps) => {
          if (r.id != id) return r;
        });
        this.componentDidMount();
        toast.success("Records Deleted Successfully");
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    }
  };

  render() {
    return (
      <Wrapper>
        <h2>Roles</h2>
        <div className="col-md-1 float-right">
          <Link to={"create"} className="btn btn-primary">
            Add Role
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.roles.map((role: RoleProps) => {
                return (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>
                      <Link to={`/roles/${role.id}/edit`} className="btn">
                        Edit
                      </Link>
                      <button
                        className="btn"
                        onClick={() => this.delete(role.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}

export default Role;
