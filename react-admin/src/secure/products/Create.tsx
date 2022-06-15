import { Component, SyntheticEvent } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { toast } from "react-toastify";
import { Navigate } from "react-router";

class CreateProduct extends Component {
  title = "";
  description = "";
  imageUrl = "";
  price = 0;

  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("/products", {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        price: this.price,
      });

      this.setState({
        redirect: true,
      });
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  imageUpload = async (files: FileList | null) => {
    if (files === null) return;
    const data = new FormData();
    data.append("imageUrl", files[0]);
    console.info(data);
  };

  render() {
    if (this.state.redirect) return <Navigate to={"/products"} />;
    return (
      <Wrapper>
        <form onSubmit={this.submit}>
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
                placeholder="Please enter the Image Url"
                onChange={(e) => (this.imageUrl = e.target.value)}
              />
              <div className="input-group-append">
                <label className="btn btn-primary">
                  Upload
                  <input
                    type="file"
                    hidden
                    onChange={(e) => this.imageUpload(e.target.files)}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="string"
              className="form-control"
              placeholder="Please enter the Product Price"
              onChange={(e) => (this.price = parseFloat(e.target.value))}
            />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Create" />
        </form>
      </Wrapper>
    );
  }
}

export default CreateProduct;
