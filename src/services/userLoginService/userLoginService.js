import axios from "axios";
import { toast } from "react-toastify";

export const LoginUser = async (userData) => {
  try {
    const response = await axios.post("/api/auth/login", userData);

    // ✅ Success toast
    toast.success(response.data.message || "Login successful!");

    // Return token or user data
    return response.data;
  } catch (error) {
    // ✅ Error message frontend pe show
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Login failed. Please try again.";

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};