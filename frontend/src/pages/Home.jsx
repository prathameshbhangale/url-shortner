import React, { useState } from 'react';
import { getShortenUrlAPI } from '../apis/urls/shortenUrl';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [name, setName] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const token = useSelector((state)=>state.user.token);
  const handleShorten = async () => {
    try {
      if(!token){
        toast.error("Plz login first")
      }
      const resp = await getShortenUrlAPI(token,{
        originalUrl:longUrl,
        name,
      })
      const data = resp?.data;
      setShortenedUrl(data?.shortUrl || 'No URL returned');
      toast.success("Short Url created")
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortenedUrl('Error occurred while shortening URL');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        URL Shortener
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Paste your long URL below and get a shortened version in one click!
      </p>

      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Set name to url..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your long URL here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleShorten}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300"
        >
          Shorten
        </button>
      </div>

      {/* Display shortened URL */}
      <div className="mt-6 text-center">
        {shortenedUrl && (
          <p className="text-gray-700">
            Shortened URL: <a href={shortenedUrl} className="text-blue-600 underline">{shortenedUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
