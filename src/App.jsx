import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import ResponseDisplay from "./components/ResponseDisplay";

function App() {
  const [response, setResponse] = useState("");

  const handleQuery = async (query) => {
    const res = await fetch("http://localhost:5000/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResponse(data.response);

    const speak = new SpeechSynthesisUtterance(data.response);
    speechSynthesis.speak(speak);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🛒 Voice Assistant</h1>
      <VoiceInput onQuery={handleQuery} />
      <ResponseDisplay response={response} />
    </div>
  );
}

export default App;
