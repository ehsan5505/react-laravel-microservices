import PermissionProps from "./permission";
import RoleProps from "./role";

export default class UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: RoleProps;
  permissions: PermissionProps;

  constructor(
    id = 0,
    firstname = "",
    lastname = "",
    email = "",
    role: RoleProps = new RoleProps(),
    permissions: PermissionProps = new PermissionProps()
  ) {
    this.id = id;
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.role = role;
    this.permissions = permissions;
  }

  get full_name() {
    return this.first_name + " " + this.last_name;
  }
}
