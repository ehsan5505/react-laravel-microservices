import React, { Component } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import { ProductProps } from "../classes/product";

class Product extends Component {
  state = {
    products: [],
  };

  delete = async (id: number) => {
    console.log("Delete the record");
  };

  componentDidMount = async () => {
    const products = await axios.get("products");
    this.setState({
      products: products.data.data,
    });
  };

  render() {
    return (
      <Wrapper>
        <h2>Products</h2>
        <div className="col-md-1 float-right">
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
                    <td>{product.imageUrl}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/products/${product.id}/edit`} className="btn">
                        Edit
                      </Link>
                      <button
                        className="btn"
                        onClick={() => this.delete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Wrapper>
    );
  }
}


export default Product;