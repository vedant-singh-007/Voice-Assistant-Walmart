import React from "react";

function ResponseDisplay({ response }) {
  if (!response) return null;

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        backgroundColor: "#f4f4f4",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "1.2rem",
      }}
    >
      <strong>Assistant says:</strong>
      <p style={{ marginTop: "0.5rem" }}>{response}</p>
    </div>
  );
}

export default ResponseDisplay;
