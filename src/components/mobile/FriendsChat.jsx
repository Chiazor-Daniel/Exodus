import React, { useState } from 'react';
import { Filter, X, Search, ChevronLeft, MessageCircle } from 'lucide-react';

// Mobile Friends Panel Component
const MobileFriendsPanel = ({ isOpen, onClose, onChatOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'chats'

  const mockFriends = [
    { id: 1, name: 'Sarah Wilson', status: 'online', avatar: '/api/placeholder/40/40', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Mike Johnson', status: 'offline', avatar: '/api/placeholder/40/40', lastMessage: 'See you tomorrow!' },
    { id: 3, name: 'Emma Davis', status: 'online', avatar: '/api/placeholder/40/40', lastMessage: 'Thanks for your help' },
    { id: 4, name: 'Chris Brown', status: 'away', avatar: '/api/placeholder/40/40', lastMessage: 'Got it!' },
  ];

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity lg:hidden
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-800 transform transition-transform 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onClose}>
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <h2 className="text-lg font-semibold dark:text-white">Friends</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          <button
            className={`flex-1 py-3 text-sm font-medium text-center ${
              activeTab === 'friends'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium text-center ${
              activeTab === 'chats'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('chats')}
          >
            Chats
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 rounded-lg border dark:border-gray-700 dark:bg-gray-700 dark:text-white text-sm"
            />
            <Search className="w-4 h-4 absolute left-2 top-3 text-gray-400" />
          </div>
        </div>

        {/* Friends/Chats List */}
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => {
                onChatOpen(friend);
                onClose();
              }}
              className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${friend.status === 'online' ? 'bg-green-500' : 
                      friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium dark:text-white">{friend.name}</p>
                {activeTab === 'chats' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {friend.lastMessage}
                  </p>
                )}
                {activeTab === 'friends' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {friend.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileFriendsPanel;