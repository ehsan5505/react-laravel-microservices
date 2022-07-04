import PermissionProps from "./permission";
import RoleProps from "./role";

export default class UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: RoleProps;
  permissions: PermissionProps[];

  constructor(
    id = 0,
    firstname = "",
    lastname = "",
    email = "",
    role: RoleProps = new RoleProps(),
    permissions: PermissionProps[] = []
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

  can_view(page: string) {
    console.info(this.permissions.some(p => console.log(p.name)));

    // return this.permissions.some((p) => {console.warn(`Name ${p.name} | Page ${page} | ${p.name === `view_${page}`}`);});
    
  }

  can_edit(page: string) {
    return this.permissions.some((p) => p.name === `edit_${page}`);
  }
}
