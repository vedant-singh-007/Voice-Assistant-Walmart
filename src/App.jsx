import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import ResponseDisplay from "./components/ResponseDisplay";

function App() {
  const [response, setResponse] = useState(null); // holds just the response text

  const handleQuery = async (query) => {
    try {
      const res = await fetch("https://voice-assistant-walmart.onrender.com/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const responseData = await res.json();
      const reply = responseData.response;

      setResponse(reply); // Set response for display

      if (reply) {
        const speak = new SpeechSynthesisUtterance(reply);
        speechSynthesis.speak(speak);
      }
    } catch (err) {
      console.error("❌ Error fetching:", err.message);
      const fallback = "Something went wrong!";
      setResponse(fallback);
      speechSynthesis.speak(new SpeechSynthesisUtterance(fallback));
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <VoiceInput onQuery={handleQuery} />
      <div className="flex-grow flex items-center justify-center">
        <ResponseDisplay response={response} />
      </div>
    </div>
  );
}

export default App;
