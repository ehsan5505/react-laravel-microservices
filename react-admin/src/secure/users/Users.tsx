import { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import Deleter from "../components/Deleter";
import UserProps from "../classes/user";
import { connect } from "react-redux";
import constant from "../../config_const";

class User extends Component<{ user: UserProps }> {
  state = {
    users: [],
  };

  page = 1;
  last_page = 1;

  componentDidMount = async () => {
    const res = await axios.get(`${constant.BASE_URL}/users?page=${this.page}`);

    console.info(res.data.data);
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

  action = (id: number) => {
    if (this.props.user.can_edit("users")) {
      return (
        <div>
          <Link to={`/users/${id}/edit`} className="btn">
            Edit
          </Link>
          <Deleter id={id} endpoint="users" handleDelete={this.delete} />
        </div>
      );
    }
  };

  render() {
    let addBtn = null;
    if (this.props.user.can_edit("users")) {
      addBtn = (
        <div className="float-right">
          <Link to={"create"} className="btn btn-primary">
            Add User
          </Link>
        </div>
      );
    }

    return (
      <Wrapper>
        <h2>Users</h2>
        {addBtn}
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
              {/* {this.state.users.map((user: UserProps) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role.name}</td>
                    <td>{this.action(user.id)}</td>
                  </tr>
                );
              })} */}
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

const mapStateToProps = (state: ({ user: UserProps })) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(User);
