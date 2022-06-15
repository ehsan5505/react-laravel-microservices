import { Component } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";

class CreateProduct extends Component {
  title = "";
  description = "";
  imageUrl = "";
  price = "";

  render() {
    return (
      <Wrapper>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the Product Title"
              onChange={(e) => (this.title = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Product Description"
              onChange={(e) => (this.description = e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Please enter the Product Title"
                onChange={(e) => (this.imageUrl = e.target.value)}
              />
              <div className="input-group-append">
                <label className="btn btn-primary">Upload</label>
                <input type="file" hidden />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the Product Price"
              onChange={(e) => (this.price = e.target.value)}
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

export default CreateProduct;
