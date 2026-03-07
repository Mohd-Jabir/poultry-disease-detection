import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Predict function
export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile); // must match backend key

  try {
    const response = await API.post("/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Prediction API Error:", error);
    throw error;
  }
};