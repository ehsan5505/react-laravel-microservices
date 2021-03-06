import { Component, SyntheticEvent } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import ImageUpload from "../components/ImageUpload";
import constant from "../../config_const";

class CreateProduct extends Component {
  title = "";
  description = "";
  imageUrl = "";
  price = 0;

  state = {
    redirect: false,
    imageUrl: "",
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${constant.BASE_URL}/products`, {
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

  imageUpload = async (image: string) => {
    this.imageUrl = image;
    this.setState({
      imageUrl: this.imageUrl,
    });
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
            <ImageUpload
              value={(this.imageUrl = this.state.imageUrl)}
              handleImage={this.imageUpload}
            />
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
