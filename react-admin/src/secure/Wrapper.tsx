import React,{Component} from "react";

class Wrapper extends Component<WrapperProps>
{
  render(): React.ReactNode {
    {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
}

export default Wrapper;