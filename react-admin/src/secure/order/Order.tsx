import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import Wrapper from "../Wrapper";
import { OrderProps } from "../classes/order";

class Order extends Component {
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
    const resp = await axios.get(`orders?page=${page}`);
    this.setState({
      orders: resp.data.data,
    });
    this.lastPage = resp.data.meta.last_page;
  };

  render() {
    return (
      <Wrapper>
        <h2>Products</h2>
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
                    <td>
                      <Link to={`/orders/${order.id}`} className="btn">
                        View
                      </Link>
                    </td>
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

export default Order;
