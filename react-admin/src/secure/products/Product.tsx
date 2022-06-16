import React, { Component } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import { ProductProps } from "../classes/product";
import { toast } from "react-toastify";
import Paginate from "../components/Paginate";
import Deleter from "../components/Deleter";

class Product extends Component {
  page = 1;
  lastPage = 0;
  state = {
    products: [],
  };

  delete = async (id: number) => {
    this.state.products.filter((p: ProductProps) => {
      if (p.id != id) return p;
    });
    this.componentDidMount();
    toast.success("Records Deleted Successfully");
  };

  componentDidMount = async () => {
    const products = await axios.get(`products?page=${this.page}`);
    this.setState({
      products: products.data.data,
    });
    this.lastPage = products.data.meta.last_page;
  };

  handleChangePage = async (page: number) => {
    this.page = page;
    await this.componentDidMount();
  };

  render() {
    return (
      <Wrapper>
        <h2>Products</h2>
        <div className="col-md-2 float-right">
          <Link to={"create"} className="btn btn-primary">
            Add Product
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map((product: ProductProps) => {
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

export default Product;