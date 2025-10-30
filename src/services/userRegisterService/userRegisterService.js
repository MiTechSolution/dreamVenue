import axios from "axios";
import { toast } from "react-toastify";

export const RegisterUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    
    // ✅ success message show
    toast.success(response.data?.message || "User registered successfully!");
    
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Registration failed';

    // ❌ error message show
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
