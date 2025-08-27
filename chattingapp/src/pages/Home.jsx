import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { roomUser } from '../features/userInfoSlice';

const Home = () => {
  const user=useSelector((state)=>state.userInfo.value)
   const roomuser=useSelector((state)=>state.userInfo.roomUser)
  const db= getDatabase()
  // State to manage mobile view
  const [showChat, setShowChat] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [chatUser, setChatUser]= useState([])
  const dispatch=useDispatch()
  const [loading, setLoading]= useState(true)

  // Check if screen is mobile size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChat(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, 'chatuser/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        const users= item.val()
        const usersId= item.key
        if (users.adderId==user?.uid || users.reciverId==user?.uid) {
          arr.push({...users, id: usersId})
        }
      })
      setChatUser(arr)
      setLoading(false)
    });
  }, [])

  const handleUserSelect = (friend) => {
    const friendId= friend.adderId==user.uid ? friend.reciverId : friend.adderId
    const friendName= friend.adderId==user?.uid ? friend.reciverName : friend.adderName

    dispatch(roomUser({
      name: friendName,
      id: friendId
    }))
  };

  const handleBackToUsers = () => {
    setShowChat(false);
  };

  return (
    <div className="flex h-screen flex-1 bg-gray-100">
      {/* Left Sidebar - Users List */}
      <div className={`${
        isMobile 
          ? (showChat ? 'hidden' : 'w-full') 
          : 'w-full md:w-1/3'
      } bg-white border-r border-gray-300 flex flex-col`}>
        {/* Header */}
        <div className="bg-gray-100 p-3 md:p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {user?.displayName?.split(" ")[0][0]+user?.displayName?.split(" ")[1][0]}
            </div>
            <h2 className="font-semibold text-gray-800 text-lg md:text-xl">{user?.displayName}</h2>
          </div>
          <div className="flex space-x-3 md:space-x-4 text-gray-600">
            <BsChatLeft className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-gray-800" />
            <BsThreeDotsVertical className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-gray-800" />
          </div>
        </div>
        {/* Search Bar */}
        <div className="p-2 md:p-3 border-b border-gray-200">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {
            loading ? (
      <div className="bg-white p-3 md:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100" ariaLabel="Loading user item">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold bg-gray-300 rounded animate-pulse h-5 w-3/4 md:w-1/2"></h3>
            </div>
          </div>
        </div>
      </div>

            ) : (
              <>
                        {chatUser.map((user, i) => (
            <div
              key={i}
              onClick={()=>handleUserSelect(user)}
              className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 `}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    {user.adderId==user?.uid ? user.adderName.charAt(0).toUpperCase() : user.reciverName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base">{user.adderId==user?.uid ? user.adderName : user.reciverName}</h3>
                    {/* <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{user.time}</span> */}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {/* <p className="text-sm text-gray-600 truncate pr-2">{user.lastMessage}</p> */}
                    {/* {user.unread > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0">
                        {user.unread}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
              </>
            )
          }

        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className={`${
        isMobile 
          ? (showChat ? 'w-full' : 'hidden') 
          : 'flex-1'
      } flex flex-col`}>
        {/* Chat Header */}
        <div className="bg-gray-100 p-3 md:p-4 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center space-x-3">
            {/* {isMobile && (
              <button 
                onClick={handleBackToUsers}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
            )} */}
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                {roomuser?.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">{roomuser?.name}</h3>
              <p className="text-xs md:text-sm text-gray-600">
                {/* {activeUser.online ? 'online' : 'last seen recently'} */}
              </p>
            </div>
          </div>
          <div className="flex space-x-3 md:space-x-4 text-gray-600">
            <IoCallOutline className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-800" />
            <IoVideocamOutline className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-800" />
            <BsThreeDotsVertical className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-gray-800" />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}>
          {/* {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                  message.sent
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sent ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))} */}
        </div>

        {/* Message Input */}
        <div className="bg-gray-100 p-2 md:p-4 border-t border-gray-300">
          <div className="flex items-center space-x-2 md:space-x-3">
            <BsEmojiSmile className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800 flex-shrink-0" />
            <BsPaperclip className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800 flex-shrink-0" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full px-3 md:px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
              />
            </div>
            <BsMic className="w-5 h-5 md:w-6 md:h-6 text-gray-600 cursor-pointer hover:text-gray-800 flex-shrink-0 md:block hidden" />
            <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors flex-shrink-0">
              <BsSend className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;