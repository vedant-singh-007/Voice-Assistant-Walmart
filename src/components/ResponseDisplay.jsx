import React from "react";

const ResponseDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow-md w-full max-w-xl mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Assistant Response</h2>
      <p className="text-gray-700 mb-4">{data.response}</p>

      {data.title && (
        <div className="flex flex-col items-center">
          {data.image && (
            <img src={data.image} alt={data.title} className="w-32 h-32 object-contain mb-2" />
          )}
          <h3 className="font-medium">{data.title}</h3>
          <p className="text-blue-600">{data.price}</p>
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              View on Walmart
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;


// import React from "react";

// function ResponseDisplay({ response }) {
//   if (!response) return null;

//   return (
//     <div
//       style={{
//         marginTop: "2rem",
//         padding: "1rem",
//         backgroundColor: "#f4f4f4",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         fontSize: "1.2rem",
//       }}
//     >
//       <strong>Assistant says:</strong>
//       <p style={{ marginTop: "0.5rem" }}>{response}</p>
//     </div>
//   );
// }

// export default ResponseDisplay;
