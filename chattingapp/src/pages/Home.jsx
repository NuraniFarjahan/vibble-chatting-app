import React from 'react';
import { 
  BsThreeDotsVertical, 
  BsChatLeft, 
  BsPersonCircle,
  BsSearch,
  BsPaperclip,
  BsEmojiSmile,
  BsMic,
  BsSend
} from 'react-icons/bs';
import { IoCallOutline, IoVideocamOutline } from 'react-icons/io5';

const Home = () => {
  // Dummy users data
  const users = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you doing?",
      time: "12:45 PM",
      unread: 2,
      avatar: "JD",
      online: true
    },
    {
      id: 2,
      name: "Sarah Wilson",
      lastMessage: "Thanks for the help yesterday!",
      time: "11:30 AM",
      unread: 0,
      avatar: "SW",
      online: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Can we reschedule the meeting?",
      time: "10:15 AM",
      unread: 1,
      avatar: "MJ",
      online: false
    },
    {
      id: 4,
      name: "Emily Davis",
      lastMessage: "Great work on the project! 👏",
      time: "Yesterday",
      unread: 0,
      avatar: "ED",
      online: true
    },
    {
      id: 5,
      name: "Alex Brown",
      lastMessage: "See you at the conference",
      time: "Yesterday",
      unread: 0,
      avatar: "AB",
      online: false
    },
    {
      id: 6,
      name: "Lisa Garcia",
      lastMessage: "The documents are ready",
      time: "2 days ago",
      unread: 3,
      avatar: "LG",
      online: true
    }
  ];

  // Dummy messages for active chat
  const messages = [
    {
      id: 1,
      text: "Hey! How are you doing?",
      time: "12:30 PM",
      sent: false
    },
    {
      id: 2,
      text: "I'm doing great, thanks for asking! How about you?",
      time: "12:32 PM",
      sent: true
    },
    {
      id: 3,
      text: "Pretty good! Just working on some new projects",
      time: "12:33 PM",
      sent: false
    },
    {
      id: 4,
      text: "That sounds exciting! What kind of projects?",
      time: "12:35 PM",
      sent: true
    },
    {
      id: 5,
      text: "Mostly web development stuff. Building some React applications with modern design patterns",
      time: "12:36 PM",
      sent: false
    },
    {
      id: 6,
      text: "Nice! I've been learning React too. It's really powerful",
      time: "12:40 PM",
      sent: true
    },
    {
      id: 7,
      text: "Absolutely! The component-based architecture makes everything so much cleaner",
      time: "12:42 PM",
      sent: false
    },
    {
      id: 8,
      text: "Totally agree! Want to collaborate on something sometime?",
      time: "12:45 PM",
      sent: true
    }
  ];

  const activeUser = users[0]; // John Doe as active chat

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar - Users List */}
      <div className="w-1/3 bg-white border-r border-gray-300 flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
              ME
            </div>
            <h2 className="font-semibold text-gray-800">Chats</h2>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <BsChatLeft className="w-5 h-5 cursor-pointer hover:text-gray-800" />
            <BsThreeDotsVertical className="w-5 h-5 cursor-pointer hover:text-gray-800" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                user.id === activeUser.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.avatar}
                  </div>
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500">{user.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                    {user.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {user.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-100 p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                {activeUser.avatar}
              </div>
              {activeUser.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{activeUser.name}</h3>
              <p className="text-sm text-gray-600">
                {activeUser.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <IoCallOutline className="w-5 h-5 cursor-pointer hover:text-gray-800" />
            <IoVideocamOutline className="w-5 h-5 cursor-pointer hover:text-gray-800" />
            <BsThreeDotsVertical className="w-5 h-5 cursor-pointer hover:text-gray-800" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sent
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sent ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-gray-100 p-4 border-t border-gray-300">
          <div className="flex items-center space-x-3">
            <BsEmojiSmile className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <BsPaperclip className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <BsMic className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors">
              <BsSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;