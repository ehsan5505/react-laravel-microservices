import React, { Component } from "react";
import { Link } from "react-router-dom";
import RoleProps from "../classes/role";
import Wrapper from "../Wrapper";
import axios from "axios";
import { deleteRecord } from "../helper/function";
import { toast } from "react-toastify";
import Deleter from "../components/Deleter";
import UserProps from "../classes/user";
import { connect } from "react-redux";
import constant from "../../config_const";

class Role extends Component<{ user: UserProps }> {
  state = {
    roles: [],
  };

  componentDidMount = async () => {
    const roles = await axios.get(`${constant.BASE_URL}/roles`);
    this.setState({
      roles: roles.data.data,
    });
  };

  delete = async (id: number) => {
    this.state.roles.filter((r: RoleProps) => {
      if (r.id != id) return r;
    });
    this.componentDidMount();
    toast.success("Records Deleted Successfully");
  };

  action = (id: number) => {
    if (this.props.user.can_edit("roles")) {
      return (
        <div>
          <Link to={`/roles/${id}/edit`} className="btn">
            Edit
          </Link>
          <Deleter id={id} endpoint={"roles"} handleDelete={this.delete} />
        </div>
      );
    }
  };

  render() {
    let addBtn = null;
    if (this.props.user.can_edit("roles")) {
      addBtn = (
        <div className="col-md-1 float-right">
          <Link to={"create"} className="btn btn-primary">
            Add Role
          </Link>
        </div>
      );
    }
    return (
      <Wrapper>
        <h2>Roles</h2>
        {addBtn}
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
                    <td>{this.action(role.id)}</td>
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

const mapStateToProps = (state: { user: UserProps }) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Role);
