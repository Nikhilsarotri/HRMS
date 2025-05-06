import React, { useState } from 'react'
import { IoMailUnreadOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronDown, FaUser } from 'react-icons/fa';

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
console.log(title,"here is title")
  return (
    <div className="mt-1 relative">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{title}</div>

        <div className="flex gap-4 items-center relative">
          <IoMailUnreadOutline className="text-xl cursor-pointer" />
          <IoMdNotificationsOutline className="text-xl cursor-pointer" />

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full border-2 border-[#6a1b9a] flex items-center justify-center">
              <FaUser className="text-white bg-[#6a1b9a] rounded-full p-1 w-full h-full" />
            </div>

            {/* Down Arrow */}
            <FaChevronDown className="text-gray-600" />
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Manage Notifications</div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
