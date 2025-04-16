import { useState } from 'react';
import { Menu, LogOut, UserCircle2 } from 'lucide-react';
import { Outlet,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePopup } from './usePopup';
import { useDispatch } from 'react-redux';
import { clearUser } from '../slices/userSlice';

export default function Navbar() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(user.token ? true : false ); // toggle this for testing
  const [username,setUsername] = useState(user.username);
  console.log(user)
  const { isOpen, toggle, popupRef } = usePopup();

  return (
    <>
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to={"/"}><div className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
        <Menu className="h-6 w-6" />
        <span>UrLsHoRtEr</span>
      </div></Link>

      {/* Nav Links */}
      
      <div className="hidden md:flex space-x-6 text-gray-600 font-medium">
        <Link to="/about" className="hover:text-indigo-600">About</Link>
        <Link to="/urls" className="hover:text-indigo-600">URLs</Link>
        <Link to="/logs" className="hover:text-indigo-600">Logs</Link>
      </div>

      {/* User Options */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login"><button className="text-indigo-600 font-medium hover:underline">Login</button></Link>
            <Link to="/register"><button className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-500">Sign Up</button></Link>
          </>
        ) : (
          <div className="relative" ref={popupRef}>
          <button
            onClick={toggle}
            className="flex items-center space-x-2 hover:text-indigo-600"
          >
            <UserCircle2 className="h-7 w-7" />
            <span className="hidden md:inline font-medium">{username}</span>
          </button>
    
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-10">
              <div className="text-sm px-3 py-2 hover:bg-gray-100 rounded-md">
                {username}
              </div>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  dispatch(clearUser)
                  toggle(); // or close() if you prefer
                }}
                className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
        )}
      </div>
    </nav>
    <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}
