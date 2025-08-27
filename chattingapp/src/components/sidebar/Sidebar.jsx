import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { 
  BsHouseDoor,
  BsPeople,
  BsGear,
  BsBoxArrowRight
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { setUser } from '../../features/userInfoSlice';

// Sidebar Component
export const Sidebar = ({ activeMenu = 'users', onMenuChange }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user=useSelector((state)=>state.userInfo.value)

  const menuItems = [
    { id: 'home', icon: BsHouseDoor, label: 'Home', link: "/" },
    { id: 'users', icon: BsPeople, label: 'Users', link:"/allusers" },
    { id: 'settings', icon: BsGear, label: 'Settings', link: "/setting" },
    { id: 'signout', icon: BsBoxArrowRight, label: 'Sign Out' }
  ];

  const signoutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      localStorage.removeItem("userInfo");
      navigate('/login');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="w-20 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors">
          {user?.displayName?.split(" ")[0][0]+user?.displayName?.split(" ")[1][0]}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              item.id === "signout" ? (
                <button 
                  key={item.id}
                  onClick={signoutHandler}
                  className="w-full flex flex-col items-center p-3 mx-2 rounded-xl transition-all duration-200 group text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <IconComponent className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              ) : (
                <NavLink 
                  to={item.link} 
                  key={item.id}
                  className={({ isActive }) =>
                    isActive 
                      ? "w-full flex flex-col items-center p-3 mx-2 rounded-xl transition-all bg-green-200 duration-200 group text-gray-700"
                      : "w-full flex flex-col items-center p-3 mx-2 rounded-xl transition-all duration-200 group text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }
                >
                  <IconComponent className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              )
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div 
          className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-gray-400 transition-colors"
          title="Profile"
        >
          {user?.displayName?.split(" ")[0][0]+user?.displayName?.split(" ")[1][0]}
        </div>
      </div>
    </div>
  );
};
