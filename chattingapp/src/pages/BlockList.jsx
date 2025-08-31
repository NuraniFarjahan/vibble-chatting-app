import React, { useEffect, useState } from 'react';
import { 
  BsSearch, 
  BsThreeDotsVertical,
  BsArrowLeft,
  BsFilter,
  BsGrid3X3Gap,
  BsShieldSlash
} from 'react-icons/bs';
import { BiPlus } from 'react-icons/bi';
import { FaUnlock, FaLock } from 'react-icons/fa';
import { Link } from 'react-router';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const BlockList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const db= getDatabase()
  
  const user= useSelector((state)=>state.userInfo.value)
  const [blockedUsers, setBlockedUsers]=useState([])
  
//   const blockedUsers = [
//     {
//       id: 1,
//       username: "john_doe",
//       email: "john@example.com",
//       phone: "+1234567890",
//       blockedDate: "2024-01-15"
//     },
//     {
//       id: 2,
//       username: "jane_smith",
//       email: "jane@example.com",
//       phone: "+1987654321",
//       blockedDate: "2024-02-10"
//     },
//     {
//       id: 3,
//       username: "mike_wilson",
//       email: "mike@example.com",
//       phone: "+1122334455",
//       blockedDate: "2024-02-28"
//     }
//   ];

      useEffect(() => {
          const starCountRef = ref(db, 'block/');
          onValue(starCountRef, (snapshot) => {
            let arr=[]
            snapshot.forEach((item)=>{
              const users= item.val()
              if (users.blockerId==user?.uid || users.blockedId==user?.uid) {
                arr.push({...users, id: item.key})
              }
            })
            setBlockedUsers(arr)
          });
        }, [])

        const unBlockHandler=(id)=>{
            remove(ref(db,"block/"+id)).then(()=>toast.success("Unblocked"))
        }
        

  return (
    <div className="min-h-screen flex-1 bg-gray-50">
        <Toaster position='top-right'/>
      <div className="max-w-6xl mx-auto bg-white shadow-sm min-h-screen">
        {/* Header */}
        <div className="bg-green-600 text-white px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/global-users">
              <BsArrowLeft className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold">Blocked Users</h1>
              <p className="text-green-100 text-base">{blockedUsers.length} blocked users</p>
            </div>
          </div>
          <div className="flex items-center relative space-x-4">
            {/* {
              dropdownOpen && (
                <div className='absolute -bottom-[200%] right-0 w-32 h-20 z-[555] p-2 rounded-lg shadow-2xl text-black bg-white'>
                  <div className="flex flex-col space-y-2">
                    <button className="text-sm text-left hover:text-green-600">Clear All</button>
                    <button className="text-sm text-left hover:text-green-600">Export List</button>
                  </div>
                </div>
              )
            } */}
            <BsGrid3X3Gap className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            <BsFilter className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" />
            <BsThreeDotsVertical 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="w-6 h-6 cursor-pointer hover:bg-green-700 hover:bg-opacity-50 rounded p-1 transition-colors" 
            />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="px-8 py-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blocked users by name or email..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-base"
              />
            </div>
            <select className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
              <option>All Time</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
            <select className="px-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
              <option>Sort by Date</option>
              <option>Sort by Name</option>
              <option>Sort by Email</option>
            </select>
          </div>
        </div>

        {/* Empty State or Blocked Users List */}
        <div className="p-8">
          {blockedUsers.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <BsShieldSlash className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blocked Users</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't blocked any users yet. Blocked users will appear here and won't be able to contact you.
              </p>
              <Link 
                to="/global-users"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
              >
                <BiPlus className="w-5 h-5 mr-2" />
                Browse Users
              </Link>
            </div>
          ) : (
            /* Blocked Users Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                /* Loading Skeleton */
                Array(3).fill().map((_, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
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
                        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                /* Blocked Users Cards */
                blockedUsers.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-white border border-red-100 rounded-xl p-6 hover:shadow-md hover:border-red-200 transition-all duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-lg">
                          {friend.blockerId==user?.uid ? friend.blockedName.charAt(0).toUpperCase() : friend.blockerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <FaLock className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 text-lg truncate">{friend.blockerId==user?.uid ? friend.blockedName : friend.blockerName}</h3>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group">
                            <FaUnlock onClick={()=>unBlockHandler(friend.id)} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                        {/* <p className="text-gray-500 text-sm mb-2">{user.email}</p>
                        <p className="text-gray-400 text-sm mb-3 truncate">{user.phone}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>Blocked on {new Date(user.blockedDate).toLocaleDateString()}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Action Buttons */}
          {/* {blockedUsers.length > 0 && (
            <div className="text-center mt-12 space-y-4">
              <div className="flex justify-center space-x-4">
                <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
                  Unblock All
                </button>
                <button className="bg-gray-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors">
                  Export List
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                These users cannot contact you or see your profile
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default BlockList;