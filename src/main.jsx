import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import AdminContext from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContext>
      <UserContext>
        <App />
      </UserContext>
    </AdminContext>
  </BrowserRouter>
);
