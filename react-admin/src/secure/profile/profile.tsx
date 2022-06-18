import axios from "axios";
import { Component, ReactNode, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import UserProps from "../classes/user";
import Wrapper from "../Wrapper";

class Profile extends Component {
  first_name = "";
  last_name = "";
  email = "";
  password = "";
  password_confirmation = "";

  state = {
    firstName: "",
    lastName: "",
    email: "",
  };

  componentDidMount = async () => {
    const resp = await axios.get("user");
    const user: UserProps = resp.data.data;
    this.setState({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  };

  updateInfo = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put("info", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
      });
      toast.success("Information Updated");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  updatePass = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.put("password", {
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
      toast.success("Information Updated");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  render() {
    return (
      <Wrapper>
        <h2> User Profile</h2>
        <hr />
        <form onSubmit={this.updateInfo}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the first name"
              onChange={(e) => (this.first_name = e.target.value)}
              defaultValue={(this.first_name = this.state.firstName)}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the last name"
              onChange={(e) => (this.last_name = e.target.value)}
              defaultValue={(this.last_name = this.state.lastName)}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Please enter the email address"
              onChange={(e) => (this.email = e.target.value)}
              defaultValue={(this.email = this.state.email)}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Update Info"
          />
        </form>
        <br />

        <h4>Password Update</h4>
        <hr />
        <form onSubmit={this.updatePass}>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Please enter the new password"
              onChange={(e) => (this.password = e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              className="form-control"
              placeholder="Please enter the confirmation password"
              onChange={(e) => (this.password_confirmation = e.target.value)}
            />
          </div>
          <br />
          <input
            type="submit"
            className="btn btn-primary"
            value="Update Password"
          />
        </form>
      </Wrapper>
    );
  }
}

export default Profile;
