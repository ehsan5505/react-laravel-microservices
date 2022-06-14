import { Component, ReactNode } from "react";
import Wrapper from "../Wrapper";

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
      <Wrapper>
        <div className="row">
          <div className="btn-toolbar right">
            <div className="btn-group">
              <a className="btn btn-secondary" onClick={this.prev}>
                Previous
              </a>
              <a className="btn btn-secondary" onClick={this.next}>
                Next
              </a>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Paginate;
