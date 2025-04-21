import React from "react";

const UrlCard = ({ name, shortUrl, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
      
      <a
        href={`http://localhost:8082/${shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline break-all text-sm"
      >
        {shortUrl}
      </a>

      <p className="text-xs text-gray-500 mt-2">
        Created At: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UrlCard;
