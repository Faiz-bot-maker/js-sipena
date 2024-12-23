import React from 'react';
import { FaBell, FaUserCircle, FaCog } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="fixed top-0 right-0 left-64 h-16 bg-white shadow-md z-40">
      <div className="flex items-center justify-end h-full px-6">
        <div className="flex items-center space-x-6">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FaBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <FaCog size={20} />
          </button>

          <div className="flex items-center space-x-3 border-l pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="relative group">
              <FaUserCircle size={32} className="text-gray-600 cursor-pointer" />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <hr className="my-1" />
                <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
