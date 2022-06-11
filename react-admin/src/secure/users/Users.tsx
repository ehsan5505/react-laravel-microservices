import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import Role from '../classes/role';
import { Link } from "react-router-dom";

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

  componentDidMount = async () => {
    const res = await axios.get(`users?page=${this.page}`);

    this.setState({
      users: res.data.data,
    });
    this.last_page = res.data.meta.last_page;
  };

  prev = async () => {
    if (this.page == 1) return ;
    this.page--;
    await this.componentDidMount();
  }
  next = async () => {
    if( this.page == this.last_page) return;
    this.page++;
    await this.componentDidMount();

  }

  render() {
    return (
      <Wrapper>
        <h2>Users</h2>
        <div className="col-md-2 right">
          <Link to={"create"} className="btn-toolbar btn">Add User</Link>
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
                      <button className="btn">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="right">
            <a className="btn" onClick={prev}>Previous</a>
            <a className="btn" onClick={next}>Next</a>
          </div>
        </div>
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
