import { getDatabase, onValue, ref } from 'firebase/database';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const [notifications, setNotifications]= useState([])
  const user= useSelector((state)=>state.userInfo.value)
  const db= getDatabase()

  // Get first character of name
  const getInitial = (name) => {
    // return name?.charAt(0).toUpperCase();
  };

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-green-500',
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-teal-500'
    ];
    // const index = name?.length % colors.length;
    // return colors[index];
  };
  console.log(notifications);
  

  useEffect(() => {
          const starCountRef = ref(db, 'notification/');
          onValue(starCountRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item)=>{
              const users= item.val()
              if (users.reciverId==user?.uid) {
                arr.push({...users, id: item.key})
              }
            })
            setNotifications(arr)
          });
        }, [])

return (
  <div className="h-screen overflow-y-auto bg-gradient-to-br flex-1 from-green-600 to-green-800 p-6">
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 rounded-t-2xl shadow-xl">
        <h2 className="text-xl font-bold">Notifications</h2>
        <p className="text-green-100 text-sm mt-1">Stay updated with the latest</p>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full bg-green-100 text-green-700 
                           flex items-center justify-center text-base font-bold shadow-sm"
              >
                {notification.senderName.charAt(0).toUpperCase()}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 truncate pr-2">
                    {notification.senderName}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {moment(notification.time).fromNow()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {notification.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default Notification;