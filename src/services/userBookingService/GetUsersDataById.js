import axios from "axios";

export const getUserBookings = async (userId) => {
  try {
    const response = await axios.get(`/api/booking/user/${userId}`);
    return response?.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error.response?.data || { error: "Server error" };
  }
};
