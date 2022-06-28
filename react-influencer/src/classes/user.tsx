
export default class UserProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  revenue: number;

  constructor(
    id = 0,
    firstname = "",
    lastname = "",
    email = "",
    revenue = 0
  ) {
    this.id = id;
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.revenue = revenue;
  }

  get full_name() {
    return this.first_name + " " + this.last_name;
  }

}
