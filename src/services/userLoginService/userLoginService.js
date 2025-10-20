import axios from "axios";
import { toast } from "react-toastify";

export const LoginUser = async (userData) => {
    debugger
  try {
    const response = await axios.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || // e.g. "User already exists"
      error.response?.data?.message ||
      'Login failed';

    // Toast me readable message dikhana
    toast.error(errorMessage);

    // Error throw karo taake upper layer (e.g. component) handle kar sake
    throw new Error(errorMessage);
  } 

};
