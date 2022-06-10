import React,{Children, Component} from "react";

class Wrapper extends Component 
{
  render(): React.ReactNode {
    {
      return (
        <div>
          {this.props->Children}
        </div>
      )
    }
  }
}

export default Wrapper;