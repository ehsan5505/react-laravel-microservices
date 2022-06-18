import { Component } from "react";
import Dashboard from "../dashboard/Dashboard";
import { NavLink } from "react-router-dom";
import UserProps from "../classes/user";
import { connect } from "react-redux";

class Menu extends Component<{ user: UserProps }> {
  menuItems = [
    {
      link: "/users",
      name: "Users",
    },
    {
      link: "/roles",
      name: "Roles",
    },
    {
      link: "/products",
      name: "Products",
    },
    {
      link: "/orders",
      name: "Orders",
    },
  ];
  render() {
    let items: JSX.Element[] = [];
    this.menuItems.forEach((menu) => {
      let name = menu.name.toLocaleLowerCase();
      if (this.props.user.can_test(name)) {
        // console.info(name);
        // console.info(`Menu | ${name}`);
        items.push(
          <li className="nav-item">
            <NavLink to={menu.link} className="nav-link" aria-current="page">
              <span data-feather="home" className="align-text-bottom"></span>
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
