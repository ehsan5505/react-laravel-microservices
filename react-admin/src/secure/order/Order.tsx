import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import Wrapper from "../Wrapper";
import { OrderProps } from "../classes/order";
import UserProps from "../classes/user";
import { connect } from "react-redux";
import constant from "../../config_const";

class Order extends Component<{ user: UserProps }> {
  lastPage = 0;
  page = 1;

  state = {
    orders: [],
  };

  handleChangePage = async (page: number) => {
    this.page = page;
    this.componentDidMount();
  };

  componentDidMount = async () => {
    const resp = await axios.get(`${constant.BASE_URL}/orders?page=${this.page}`);
    this.setState({
      orders: resp.data.data,
    });
    this.lastPage = resp.data.meta.last_page;
  };

  export = async () => {
    const resp = await axios.get(`${constant.BASE_URL}/export`, { responseType: "blob" });
    const blob = new Blob([resp.data], { type: "text/csv" });

    // Now Create the Dummy URl
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Orders.csv";
    link.click();
  };

  action = (id: number) => {
    if (this.props.user.can_edit("orders")) {
      return (
        <Link to={`/orders/${id}`} className="btn">
          View
        </Link>
      );
    }
  };

  render() {
    return (
      <Wrapper>
        <h2>Orders</h2>
        <div className="btn-group me-2">
          <a
            onClick={this.export}
            type="button"
            className="btn btn-sm btn-outline-secondary"
          >
            Export
          </a>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order: OrderProps) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.first_name}</td>
                    <td>{order.last_name}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>{this.action(order.id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paginate
            lastPage={this.lastPage}
            handleChangePage={this.handleChangePage}
          />
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: { user: UserProps }) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Order);
