import { Component, ReactNode } from "react";
import Wrapper from "../Wrapper";
import Nav from "./nav";

class Paginate extends Component<{ lastPage: number; handleChangePage: any }> {
  page = 1;
  prev = () => {
    if (this.page > 1) {
      this.page--;
      this.props.handleChangePage(this.page);
    }
  };

  next = () => {
    if (this.page === this.props.lastPage) {
      return;
    }
    this.page++;
    this.props.handleChangePage(this.page);
  };

  render() {
    return (
      <Nav>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link btn btn-secondary" onClick={this.prev}>
              Previous
            </a>
            <a className="page-link btn btn-secondary" onClick={this.next}>
              Next
            </a>
          </li>
        </ul>
      </Nav>
    );
  }
}

export default Paginate;
