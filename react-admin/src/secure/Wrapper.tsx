import React,{Component} from "react";

class Wrapper extends Component 
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