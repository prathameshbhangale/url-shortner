import React from 'react'

function Home() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          URL Shortener
        </h1>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          Paste your long URL below and get a shortened version in one click!
        </p>
  
        <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter your long URL here..."
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300">
            Shorten
          </button>
        </div>
  
        {/* Placeholder for shortened URL display */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Your shortened URL will appear here</p>
        </div>
      </div>
    );
  }

export default Home