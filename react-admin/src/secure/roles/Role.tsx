import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { SyntheticEvent } from 'react-toastify/dist/utils';
import RoleProps from '../classes/role';
import Wrapper from '../Wrapper';
import axios from 'axios';

class Role extends Component {

  state=({
    roles: []
  })

  componentDidMount = async() => {
    const roles = await axios.get('roles');
    this.setState({
      roles : roles
    });
  }

  delete = async(id) => 
  {

  }

  render(){
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
                      <Link to={`/users/${role.id}/edit`} className="btn">Edit</Link>
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
  }

}
