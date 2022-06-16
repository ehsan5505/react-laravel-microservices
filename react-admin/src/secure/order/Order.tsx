import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import Wrapper from "../Wrapper";

class Order extends Component {
  lastPage = 0;
  page = 1;

  componentDidMount = async () => {
    const resp = await axios.get("orders");
    console.info(resp.data);
    // this.lastPage = resp.meta.last_page;
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
                <th scope="col">OrderID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col"></th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.products.map((product: ProductProps) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img src={product.imageUrl} width="50" />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/products/${product.id}/edit`} className="btn">
                        Edit
                      </Link>
                      <Deleter
                        id={product.id}
                        endpoint={"products"}
                        handleDelete={this.delete}
                      />
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
          {/* <Paginate
            lastPage={this.lastPage}
            handleChangePage={this.handleChangePage}
          /> */}
        </div>
      </Wrapper>
    );
  }
}

export default Order;
