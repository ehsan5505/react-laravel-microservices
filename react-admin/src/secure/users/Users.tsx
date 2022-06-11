import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios, { AxiosError } from "axios";
import Role from "../classes/role";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
}

class User extends Component {
  state = {
    users: [],
  };

  page = 1;
  last_page = 1;
  message: string = "";

  componentDidMount = async () => {
    const res = await axios.get(`users?page=${this.page}`);

    this.setState({
      users: res.data.data,
    });
    this.last_page = res.data.meta.last_page;
  };

  prev = async () => {
    if (this.page == 1) return;
    this.page--;
    await this.componentDidMount();
  };
  next = async () => {
    if (this.page == this.last_page) return;
    this.page++;
    await this.componentDidMount();
  };

  delete = async (id: number) => {
    toast.warn("Delete is clicked");
    // if (window.confirm("Are you sure to Delete the Records?")) {
      // await axios.delete(`users/${id}`).catch((err:AxiosError) => {
      //   if (err.response) {
      //     let msg;
      //     msg = err.response.data.message;
      //     toast.error("Error:"+msg);
      //   }
      // });

      // refresh the state
      // this.state.users.filter((u: UserProps) => {
      //   if (u.id != id) return u;
      // });
    // }
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
                      <button className="btn">Edit</button>
                      <button
                        className="btn"
                        onClick={() => this.delete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="btn-toolbar right">
            <div className="btn-group">
              <a className="btn btn-secondary" onClick={this.prev}>
                Previous
              </a>
              <a className="btn btn-secondary" onClick={this.next}>
                Next
              </a>
            </div>
          </div>
        </div>
        {/* <ToastContainer /> */}
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
