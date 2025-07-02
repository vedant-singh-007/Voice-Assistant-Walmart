import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function VoiceInput({ onQuery }) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    onQuery(transcript);
  };

  return (
    <div>
      <button onClick={handleStart}>🎤 Start Listening</button>
      <button onClick={handleStop}>🛑 Stop</button>
      <p>
        {listening ? "Listening..." : "Click start and speak your query"}
      </p>
      <p><strong>You said:</strong> {transcript}</p>
    </div>
  );
}

export default VoiceInput;
