import React from "react";
import { useNavigate } from "react-router-dom";

/* shown for any address that does not match a route, an empty or mistyped url included */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        /* border box keeps the padding inside the height, and the navbar sits above this screen,
           so a full 100vh would always spill over and raise a scrollbar */
        boxSizing: "border-box",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#000000", fontSize: "96px", fontWeight: "700", margin: 0, lineHeight: 1 }}>404</h1>

      <h2 style={{ color: "#000000", fontSize: "28px", fontWeight: "600", marginTop: "16px" }}>
        Page Not Found
      </h2>

      <p style={{ color: "#000000", fontSize: "16px", maxWidth: "460px", marginTop: "8px" }}>
        The page you are looking for does not exist or the address was typed incorrectly.
      </p>

      <button
        type="button"
        className="btn btn-sm m-t-15"
        style={{ backgroundColor: "#e53935", color: "#ffffff", minWidth: "130px" }}
        onClick={() => navigate("/")}
      >
        Go To Home
      </button>
    </div>
  );
};

export default NotFound;
