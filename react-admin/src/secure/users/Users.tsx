import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios, { AxiosError } from "axios";
import RoleProps from "../classes/role";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import Deleter from "../components/Deleter";
import UserProps from "../classes/user";

interface Error {
  response: any;
}

class User extends Component {
  state = {
    users: [],
  };

  page = 1;
  last_page = 1;

  componentDidMount = async () => {
    const res = await axios.get(`users?page=${this.page}`);

    this.setState({
      users: res.data.data,
    });
    this.last_page = res.data.meta.last_page;
  };

  handleChangePage = async (page: number) => {
    this.page = page;
    await this.componentDidMount();
  };

  delete = async (id: number) => {
    this.state.users.filter((u: UserProps) => {
      if (u.id != id) return u;
    });
    this.componentDidMount();
    toast.success("Records Deleted Successfully");
  };

  render() {
    return (
      <Wrapper>
        <h2>Users</h2>
        <div className="col-md-1 float-right">
          <Link to={"create"} className="btn btn-primary">
            Add User
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user: UserProps) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>
                      <Link to={`/users/${user.id}/edit`} className="btn">
                        Edit
                      </Link>
                      <Deleter
                        id={user.id}
                        endpoint="users"
                        handleDelete={this.delete}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Paginate
          lastPage={this.last_page}
          handleChangePage={this.handleChangePage}
        />
      </Wrapper>
    );
  }
}
// = () => (
//   <Wrapper>
//     <h2>Welcome To the User Portal...</h2>
//   </Wrapper>
// );

export default User;
