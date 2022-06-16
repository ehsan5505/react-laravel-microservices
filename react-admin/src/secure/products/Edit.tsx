import { Component, PropsWithRef, SyntheticEvent } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router";
import ImageUpload from "../components/ImageUpload";
import { ProductProps } from "../classes/product";

class EditProduct extends Component<any> {
  title = "";
  description = "";
  imageUrl = "";
  price = 0;
  id = 0;

  state = {
    redirect: false,
    imageUrl: "",
    title: "",
    description: "",
    price: "",
  };

  componentDidMount = async () => {
    this.id = this.props.params.id;
    const res = await axios.get(`/products/${this.id}`);
    const product: ProductProps = res.data.data;
    this.setState({
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
    });
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/products/${this.id}`, {
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
              defaultValue={(this.title = this.state.title)}
              onChange={(e) => (this.title = e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              placeholder="Product Description"
              defaultValue={(this.description = this.state.description)}
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
              type="number"
              className="form-control"
              placeholder="Please enter the Product Price"
              value={(this.price = parseFloat(this.state.price))}
              onChange={(e) => (
                (this.price = parseFloat(e.target.value)),
                this.setState({
                  price: e.target.value,
                })
              )}
            />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Create" />
        </form>
      </Wrapper>
    );
  }
}

export default (props: PropsWithRef<any>) => (
  <EditProduct {...props} params={useParams()} />
);
