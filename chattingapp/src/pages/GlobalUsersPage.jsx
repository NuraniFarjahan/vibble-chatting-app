import React, { useEffect, useState } from 'react';
import { 
  BsSearch, 
  BsThreeDotsVertical,
  BsArrowLeft,
  BsPersonPlus,
  BsFilter,
  BsGrid3X3Gap
} from 'react-icons/bs';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { BiPlus } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import { FaUserCheck } from 'react-icons/fa';

const GlobalUsersPage = () => {
  const db = getDatabase();
  const user= useSelector((state)=>state.userInfo.value)
  const [userList, setUserList]= useState([])
  const [chatUserId, setChatUserId]= useState([])
  const [loading, setLoading]= useState(true)

  
    useEffect(() => {
      const starCountRef = ref(db, 'chatuser/');
      onValue(starCountRef, (snapshot) => {
        let arr=[]
        snapshot.forEach((item)=>{
          const users= item.val()
          const usersId= item.key
          if (users.adderId==user?.uid || users.reciverId==user?.uid) {
            arr.push(users.adderId+users.reciverId)
          }
        })
        setChatUserId(arr)

      });
    }, [])
  
console.log(chatUserId, "id");

  useEffect(() => {
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        const users= item.val()
        const usersId= item.key
        if (item.key!==user?.uid) {
          arr.push({...users, id: usersId})
        }
      })
      setUserList(arr)
      setLoading(false)
    });
  }, [])

const sentFriendReq=(reciver)=>{
  set(push(ref(db, "chatuser/")),{
    adderName: user?.displayName,
    adderId: user?.uid,
    reciverName: reciver.username,
    reciverId: reciver.id
  }).then(()=>toast.success("Added"))
}

  


  return (
    <div className="min-h-screen flex-1 bg-gray-50">
      <Toaster position='top-right'/>
      <div className="max-w-6xl mx-auto bg-white shadow-sm min-h-screen">
        {/* Header */}
        <div className="bg-green-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <BsArrowLeft className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            <div>
              <h1 className="text-2xl font-semibold">Global Users</h1>
              <p className="text-green-100 text-base">{userList.length} users worldwide</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <BsGrid3X3Gap className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            <BsFilter className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            <BsThreeDotsVertical className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users by name, username, or location..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-base"
              />
            </div>
            <select className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
              <option>All Locations</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Americas</option>
              <option>Africa</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
              <option>All Users</option>
              <option>Online Only</option>
              <option>Most Mutual Friends</option>
            </select>
          </div>
        </div>

        {/* Users Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              loading ? (
      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
              <button className="p-2 bg-gray-300 rounded-lg"></button>
            </div>
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>

              ) : (<>
                          {userList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-200 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {item.username.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">{item.username}</h3>
                      {
                        chatUserId.includes(user?.uid+item.id) || chatUserId.includes(item.id+user?.uid) ?                       <button  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <FaUserCheck className="w-5 h-5" />
                      </button> :                       <button onClick={()=>sentFriendReq(item)}  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <BsPersonPlus className="w-5 h-5" />
                      </button>
                      }

                    </div>
                    <p className="text-gray-500 text-sm mb-2">{item.email}</p>
                    <p className="text-gray-400 text-sm mb-3 truncate">{item.phone}</p>
                  </div>
                </div>


              </div>
            ))}
              </>)
            }

          </div>

          {/* Load More Section */}
          <div className="text-center mt-12">
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
              Load More Users
            </button>
            <p className="text-gray-500 text-sm mt-3">Showing 12 of 1,247 users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalUsersPage;