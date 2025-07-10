import React, { useEffect } from "react";

const ResponseDisplay = ({ response }) => {
  // 🔊 Speak the assistant response aloud
  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.5; // 👈 Adjust this value (1.0 is normal speed)
    utterance.pitch = 1;  // You can adjust this too if needed
    utterance.lang = "en-US";
    speechSynthesis.cancel(); // Stop any previous speech
    speechSynthesis.speak(utterance);
  };

  // 🔁 Speak every time response updates
  useEffect(() => {
    if (response) {
      speakResponse(response);
    }
  }, [response]);

  if (!response) return null;

  return (
    <div className="min-h-screen w-full bg-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="bg-[#0071dc] px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Walmart Assistant Response
            </h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line text-base">
                {response}
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
              <button className="px-5 py-2 bg-[#0071dc] hover:bg-blue-700 text-white text-sm font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseDisplay;
