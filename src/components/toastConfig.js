// utils/toastConfig.js
import { toast } from 'react-toastify';

// For success messages
export const showSuccessToast = (message) => {
  toast.success(message, { 
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// For error messages (with default fallback)
export const showErrorToast = (error) => {
  let displayMessage = 'An error occurred';
  
  // Handle different error formats
  if (typeof error === 'string') {
    displayMessage = error;
  } else if (error?.message) {
    displayMessage = error.message;
  } else if (error?.response?.data?.message) {
    displayMessage = error.response.data.message; // For API errors
  }

  toast.error(displayMessage, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      fontSize: '14px',  // Adjust this value as needed
      fontWeight: 'bold', // Optional: makes text stand out more
      color: 'black'
    },
    bodyStyle: {
      fontSize: '16px'   // Ensures consistent font size
    }
  });
};