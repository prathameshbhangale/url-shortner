import { useState } from "react";
import { loginApi } from "../apis/auth/login";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/userSlice";
import { toast } from 'react-toastify';
import { setName } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
const navigate = useNavigate();

 
const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const resp = await loginApi({ username, password });
  
      if (resp?.success) {
        console.log(resp.data.token);
        console.log(username);
  
        dispatch(setToken(resp.data.token));

        dispatch(setName(username));

        

        // setUsername("")
        // setPassword("")

        toast.success('Login successful');
        navigate("/")
      } else {
        toast.error('Incorrect credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
