import React, { useState } from 'react';
import { X, Send, Circle, UsersRound } from 'lucide-react';
import Avatar from 'react-avatar';

// Mock data for friends
const mockFriends = [
  { id: 1, name: 'Sarah Wilson', status: 'online', avatar: '/api/placeholder/40/40' },
  { id: 2, name: 'Mike Johnson', status: 'offline', avatar: '/api/placeholder/40/40' },
  { id: 3, name: 'Emma Davis', status: 'online', avatar: '/api/placeholder/40/40' },
  { id: 4, name: 'Chris Brown', status: 'away', avatar: '/api/placeholder/40/40' },
];

// Friends Component
const FriendsList = ({ onChatOpen }) => {
  return (
    <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2"> <UsersRound className='inline' size={20}/> Friends</h2>
      <div className="space-y-2">
        {mockFriends.map((friend) => (
          <div
            key={friend.id}
            onClick={() => onChatOpen(friend)}
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <div className="relative">
              <Avatar
                src={friend.avatar}
                name={friend.name}
                size='40'
                className="rounded-full"
              />
              <Circle
                className={`absolute bottom-0 right-0 w-3 h-3 ${
                  friend.status === 'online'
                    ? 'text-green-500'
                    : friend.status === 'away'
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                } fill-current`}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-white">{friend.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {friend.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Chat Modal Component
const ChatModal = ({ friend, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey there!', sender: 'friend' },
    { id: 2, text: 'Hi! How are you?', sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: 'user' },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar
            src={friend.avatar}
            name={friend.name}
               size='50'
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium dark:text-white">{friend.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {friend.status}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-2 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export { FriendsList, ChatModal };