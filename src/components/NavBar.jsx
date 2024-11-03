import React from 'react';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import Avatar from 'react-avatar';

export const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 fixed top-0 w-full z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src='earth.png' className='w-10' alt="Logo" />
          <span className="text-xl font-semibold dark:text-white">Exodus</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search notes, questions..." 
              className="w-full p-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-gray-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <Avatar name="Buzz C" src='https://buzzstezz.netlify.app/buzz.jpeg' size="40" round={true} />
        </div>
      </div>
    </nav>
  );
};
