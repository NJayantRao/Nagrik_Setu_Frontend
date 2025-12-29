import { toast } from "react-toastify";

/**
 * Displays a toast notification to provide feedback to the user
 * Used for success, error, warning, or informational messages
 */

export const notify = (message, type = "success") => {
  const colors = {
    success: "#4f46e5", // Indigo (your success color)
    error: "#dc2626", // Red-600
    info: "#2563eb", // Blue-600
    warning: "#f59e0b", // Amber-500
  };

  toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    theme: "colored",
    style: {
      background: colors[type],
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
    },
  });
};
