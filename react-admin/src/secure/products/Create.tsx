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
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Product Description"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the Product Title"
            >
              {/* <label className="btn">Upload</label>
              <input type="file" /> */}
            </input>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter the Product Title"
            />
          </div>
        </form>
      </Wrapper>
    );
  }
}

export default CreateProduct;
