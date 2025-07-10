import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import logo from "../assets/walmart-logo.png";

function VoiceInput({ onQuery }) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleStart = () => {
  resetTranscript();
  SpeechRecognition.startListening({
    continuous: true,
    interimResults: true
  });
};


  const handleStop = () => {
    SpeechRecognition.stopListening();
    onQuery(transcript);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
 <header className="bg-[#0071dc] py-4 px-4 shadow-md w-full relative flex justify-center items-center">
  {/* Walmart logo on the left */}
  <div className="absolute left-4 flex items-center">
    <img
      src={logo}
      alt="Walmart Logo"
      className="h-10 mr-2"
    />
  
  </div>

  {/* Center title */}
  <h1 className="text-white text-2xl font-bold">Voice Assistant</h1>
</header>

{/* <header className="bg-[#0071dc] py-4 px-4 shadow-md w-full relative flex justify-center items-center">
  <span className="absolute left-4 font-bold text-white text-lg">Walmart</span>
  <h1 className="text-white text-2xl font-bold">Voice Assistant</h1>
</header> */}


      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center w-full bg-white px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <div className="flex flex-col items-center space-y-6 w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center w-full">
              Speak Your Shopping Needs
            </h2>

            <div className="flex space-x-4">
              <button
                onClick={handleStart}
                className={`flex items-center justify-center px-8 py-3 rounded-full text-white font-semibold text-base focus:outline-none transition ${
                  listening ? "bg-gray-400" : "bg-[#0071dc] hover:bg-blue-700"
                }`}
                disabled={listening}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  />
                </svg>
                Start Listening
              </button>

              <button
                onClick={handleStop}
                className={`flex items-center justify-center px-8 py-3 rounded-full font-semibold text-base focus:outline-none transition ${
                  !listening
                    ? "bg-gray-100 text-gray-500"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
                disabled={!listening}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                  />
                </svg>
                Stop
              </button>
            </div>

            <p className="text-md font-medium text-gray-800">
              {listening ? (
                <span className="flex items-center">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0071dc]"></span>
                  </span>
                  Listening...
                </span>
              ) : (
                "Click start and speak your query"
              )}
            </p>

            {transcript && (
              <div className="w-full bg-blue-50 p-6 rounded-lg border border-blue-100">
                <p className="text-sm font-semibold text-blue-800 mb-1">You said:</p>
                <p className="text-lg text-gray-900">"{transcript}"</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
    </div>
  );
}

export default VoiceInput;
