import Permission from "./permission";

class RoleProps {
  id: number;
  name: string;
  permission: Permission[];

  constructor(id = 0, name = "", permission = new Permission()) {
    this.id = id;
    this.name = name;
    this.permission = permission[];
  }
}

export default RoleProps;
