import { Filter } from 'lucide-react';
import React from 'react';

export const Sidebar = () => {
  const filters = ['All Questions', 'My Questions', 'Answered', 'Unanswered'];
  
  return (
    <div className="hidden lg:block">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm sticky top-24">
        <div className='flex items-center mb-4 gap-2'>
          <Filter size={20} className='dark:text-gray-500' />
          <h3 className="font-semibold  dark:text-white">Filters</h3>
        </div>
        <div className="space-y-2 ml-6">
          {filters.map((filter) => (
            <button 
              key={filter}
              className="w-full text-left text-sm p-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded dark:text-gray-200"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};