// 📁 client/components/ResponseDisplay.jsx

import React from "react";

const ResponseDisplay = ({ response }) => {
  if (!response) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🛒 Assistant Response
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {response}
        </p>
      </div>
    </div>
  );
};

export default ResponseDisplay;
