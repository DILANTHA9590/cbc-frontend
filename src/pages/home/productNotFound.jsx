import React from "react";

export default function ProductNotFound(){
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the product you're looking for does not exist or is currently unavailable.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => window.location.href = "/"}
        >
          Go Back to Home
        </button>
      </div>
      <img
        src="https://via.placeholder.com/400x300?text=No+Product+Found"
        alt="No Product Found"
        className="mt-8 rounded-lg shadow-lg"
      />
    </div>
  );
};


