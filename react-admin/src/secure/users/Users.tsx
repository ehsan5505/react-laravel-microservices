import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";

interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: any;
}

class User extends Component {
  state = {
    users: [],
  };

  componentDidMount = async () => {
    const res = await axios.get("users");

    this.setState({
      users: res.data.data,
    });
  };
  render() {
    return (
      <Wrapper>
        <h2>Users</h2>
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
                    <td></td>
                    <td></td>
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
// = () => (
//   <Wrapper>
//     <h2>Welcome To the User Portal...</h2>
//   </Wrapper>
// );

export default User;
