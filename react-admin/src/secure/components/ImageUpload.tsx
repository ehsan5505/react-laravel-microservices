import axios from "axios";
import { Component } from "react";
import { toast } from "react-toastify";
import constant from "../../config_const";

class ImageUpload extends Component<{ value: string; handleImage: any }> {
  imageUrl = "";

  imageUpload = async (files: FileList | null) => {
    // Return if no file is given
    if (files === null) return;

    const data = new FormData();
    try {
      data.append("image", files[0]);
      console.info(data);
      const response = await axios.post(`${constant.BASE_URL}/image`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.imageUrl = response.data.url;
      this.props.handleImage(this.imageUrl);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Please enter the Image Url"
          value={(this.imageUrl = this.props.value)}
          onChange={(e) => (
            (this.imageUrl = e.target.value),
            this.props.handleImage(this.imageUrl)
          )}
        />
        <div className="input-group-append">
          <label className="btn btn-primary">
            Upload
            <input
              type="file"
              hidden
              // accept="image/*"
              onChange={(e) => this.imageUpload(e.target.files)}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
