import { Component, PropsWithRef, ReactNode } from "react";
import axios from "axios";
import Wrapper from "../Wrapper";
import { OrderItemProps } from "../classes/order_item";
import { useParams } from "react-router";

class OrderItems extends Component<any> {
  id = 0;
  state = {
    orderItems: [],
  };

  componentDidMount = async () => {
    this.id = this.props.params.id;
    const resp = await axios.get(`orders/${this.id}`);
    this.setState({
      OrderItems: resp.data.data,
    });
    console.info(resp.data);
  };

  render() {
    return (
      <Wrapper>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orderItems.map((orderItem: OrderItemProps) => {
                return (
                  <tr key={orderItem.id}>
                    <td>{orderItem.id}</td>
                    <td>{orderItem.product_title}</td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.quantity}</td>
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

export default (props: PropsWithRef<any>) => (
  <OrderItems {...props} params={useParams()} />
);
