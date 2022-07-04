import { Component } from "react";
import Dashboard from "../dashboard/Dashboard";
import { NavLink } from "react-router-dom";
import UserProps from "../classes/user";
import { connect } from "react-redux";

class Menu extends Component<{ user: UserProps }> {
  menuItems = [
    {
      id: 1,
      link: "/users",
      name: "Users",
    },
    {
      id: 2,
      link: "/roles",
      name: "Roles",
    },
    {
      id: 3,
      link: "/products",
      name: "Products",
    },
    {
      id: 4,
      link: "/orders",
      name: "Orders",
    },
  ];
  render() {
    let items: JSX.Element[] = [];
    console.info(this.props.user);
    this.menuItems.forEach((menu) => {
      let name = menu.name.toLocaleLowerCase();
      if (this.props.user.can_view(name)) {
        items.push(
          <li key={menu.id} className="nav-item">
            <NavLink to={menu.link} className="nav-link">
              <span className="align-text-bottom"></span>
              {menu.name}
            </NavLink>
          </li>
        );
      }
    });

    return (
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link" aria-current="page">
                <span data-feather="home" className="align-text-bottom"></span>
                Dashboard
              </NavLink>
            </li>
            {items}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Menu);
