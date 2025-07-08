import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import ResponseDisplay from "./components/ResponseDisplay";

function App() {
  const [data, setData] = useState(null); // holds full response object

  const handleQuery = async (query) => {
    try {
      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const responseData = await res.json();
      setData(responseData);

      // Speak only the response text
      if (responseData.response) {
        const speak = new SpeechSynthesisUtterance(responseData.response);
        speechSynthesis.speak(speak);
      }
    } catch (err) {
      console.error("❌ Error fetching:", err.message);
      setData({ response: "Something went wrong!" });
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🛒 Voice Assistant</h1>
      <VoiceInput onQuery={handleQuery} />
      <ResponseDisplay data={data} />
    </div>
  );
}

export default App;
