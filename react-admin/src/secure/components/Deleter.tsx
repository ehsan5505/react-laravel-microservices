import axios, { AxiosError } from "axios";
import { Component } from "react";
import { toast } from "react-toastify";
import constant from "../../config_const";

class Deleter extends Component<{ id: number; endpoint: string, handleDelete:any }> {
  delete = async () => {
    if (window.confirm("Are you sure to delete the record?")) {
      try {
        await axios.delete(`${constant.BASE_USER + this.props.endpoint}/${this.props.id}`);
        this.props.handleDelete(this.props.id);
      } catch (err: any) {
        toast.error(err.response.data.message);
      }
    }
  };
  render() {
    return (
      <button className="btn" onClick={() => this.delete()}>
        Delete
      </button>
    );
  }
}

export default Deleter;
