import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import constant from "../../config_const";

export const deleteRecord = async ($model: any, id: number) => {
  if (window.confirm("Are you sure to delete the record?")) {
    try {
      await axios.delete(`${constant.USER_URL}/users/${id}`);

      return true;
    } catch (err: any) {
      const errors = err as any | AxiosError;
      if (axios.isAxiosError(err)) {
        toast.error(errors.response.data.message);
      }
      return false;
    }
    // refresh the state
  }
};
