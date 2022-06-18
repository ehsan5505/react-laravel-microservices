import RoleProps from "./role";

export default class UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: RoleProps;

  constructor(
    id = 0,
    firstname = "",
    lastname = "",
    email = "",
    role: RoleProps = new RoleProps()
  ) {
    this.id = id;
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.role = role;
  }

  get full_name() {
    return this.first_name + " " + this.last_name;
  }
}
