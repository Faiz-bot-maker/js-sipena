import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome,
  FaBars,
  FaTimes,
  FaCopyright 
} from 'react-icons/fa';
import { BiBookBookmark } from 'react-icons/bi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: <FaHome size={20} />, title: 'Dashboard' },
    { path: '/penelitian', icon: <BiBookBookmark size={20} />, title: 'Penelitian' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 
      ${isCollapsed ? 'w-20' : 'w-64'} z-50`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'hidden' : 'block'}`}>
          <BiBookBookmark size={32} className="text-blue-400" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-300 text-transparent bg-clip-text">
            SIPENA
          </span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
        >
          {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 transition-all
              ${location.pathname === item.path 
                ? 'bg-blue-600/20 border-r-4 border-blue-400 text-blue-400' 
                : 'hover:bg-gray-800/50 hover:text-blue-400'}
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <div className={`${isCollapsed ? 'mx-auto' : ''} transition-transform duration-200 hover:scale-110`}>
              {item.icon}
            </div>
            <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>
              {item.title}
            </span>
          </Link>
        ))}
      </nav>

      <div className={`absolute bottom-0 w-full p-4 border-t border-gray-700/50 bg-gray-800/30
        ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <FaCopyright size={14} />
          <span>2024 SIPENA</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
