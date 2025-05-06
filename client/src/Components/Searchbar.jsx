import React from 'react'
import { FaSearch,FaUserPlus } from 'react-icons/fa';

const Searchbar = ({ placeholder = "Search...", onChange }) => {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full shadow-sm">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-sm w-full"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Searchbar