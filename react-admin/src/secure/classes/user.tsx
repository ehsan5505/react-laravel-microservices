import PermissionProps from "./permission";
import RoleProps from "./role";

export default class UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: RoleProps;
  permissions: string[];

  constructor(
    id = 0,
    firstname = "",
    lastname = "",
    email = "",
    roles: RoleProps = new RoleProps(),
    permissions: string[] = []
  ) {
    this.id = id;
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.roles = roles;
    this.permissions = permissions;
  }

  get full_name() {
    return this.first_name + " " + this.last_name;
  }

  can_view(page: string) {
    return this.permissions.some((p) => p === `view_${page}` );
    
  }

  can_edit(page: string) {
    return this.permissions.some((p) => p === `edit_${page}`);
  }
}
