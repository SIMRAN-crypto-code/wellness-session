import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "8px 16px",
        cursor: "pointer",
        borderRadius: 4,
      }}
    >
      {children}
    </button>
  );
}
