import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

export const deleteRecord = async ($model: any, id: number) => {
  if (window.confirm("Are you sure to delete the record?")) {
    try {
      await axios.delete(`users/${id}`);

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
