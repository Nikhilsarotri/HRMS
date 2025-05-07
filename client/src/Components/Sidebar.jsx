import React from 'react'
import { FaSearch,FaUserPlus } from 'react-icons/fa';
import { HiOutlineUsers } from "react-icons/hi2";
import { VscGraph } from "react-icons/vsc";
import { IoSparklesOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Searchbar from './Searchbar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { Base_Url } from '../../../server/constants';





const Sidebar = ({setPageTitle}) => {
    const navigate= useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const  [showModal,setShowModal]= useState(false)
    const location = useLocation();
    const isActive = (path) => location.pathname === path;



//handling path
    const handleNav = (path, title) => {
        setPageTitle(title);
        navigate(path);
      };
       const handleLogout= async ()=>{
try{
  await axios.post(Base_Url + "/user/logout", {}, { withCredentials: true });
 navigate("/login")

}
catch(err){
  console.log(err)
}
       }
    
  return (
    <>
<div className='w-[240px] h-screen bg-white px-5 py-[30px]   shadow-xl flex flex-col gap-5 fixed top-0 left-0'>
    <div className="text-[20px] font-bold text-[#6a1b9a] flex items-center gap-[10px]">
       LOGO
</div>
{/* <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full shadow-sm">
  <FaSearch className="text-gray-500 mr-2" />
  <input
    type="text"
    placeholder="Search"
    className="bg-transparent outline-none text-sm w-full"
  />
</div> */}
<div>
    <Searchbar
    placeholder='search here'
     onChange={(value) => setSearchTerm(value)}/>
</div>


<div className="flex flex-col gap-y-4">
  <p className="text-base text-[#A4A4A4] flex items-center gap-[10px]">Recruitment</p>

  <div className={`flex gap-5 items-center cursor-pointer ${
    isActive('/candidates') ? 'text-purple-800 font-semibold' : 'text-gray-800'
  }`} onClick={()=>handleNav('/candidates','Candidates')}>
    <FaUserPlus /> <span>Candidates</span>
  </div>
</div>

      <div className="flex flex-col gap-y-4">
        <p className="text-base text-[#A4A4A4] flex items-center gap-[10px] ">Organization</p>

        <div className={`flex gap-5 items-center cursor-pointer ${
    isActive('/employees') ? 'text-purple-800 font-semibold' : 'text-gray-800'
  }` } onClick={()=>handleNav('/employees','Employees')}
        //   className={`sidebar-link ${isActive('/candidates') ? 'active' : ''}`}
        //   onClick={() => handleNav('/candidates', 'Candidates')}
        >
          <HiOutlineUsers />
          <span>Employees</span>
        </div>
        
        <div className={`flex gap-5 items-center  cursor-pointer ${
    isActive('/attendance') ? 'text-purple-800 font-semibold' : 'text-gray-800'}`} onClick={()=>handleNav('/attendance','Attendance')}
        //   className={`sidebar-link ${isActive('/candidates') ? 'active' : ''}`}
        //   onClick={() => handleNav('/candidates', 'Candidates')}
        >
         <VscGraph />
          <span>Attendance</span>
        </div>
        
        <div className={`flex gap-5 items-centercursor-pointercursor-pointer ${
    isActive('/leaves') ? 'text-purple-800 font-semibold' : 'text-gray-800'}`} onClick={()=>handleNav('/leaves','Leaves')}
        //   className={`sidebar-link ${isActive('/candidates') ? 'active' : ''}`}
        //   onClick={() => handleNav('/candidates', 'Candidates')}
        >
          <IoSparklesOutline />
          <span className='hover:cursor-pointer'>Leaves</span>
        </div>
        
     
      </div>
      <div className="flex flex-col gap-y-4">
  <p className="text-base text-[#A4A4A4] flex items-center gap-[10px]">Others</p>

  <div className="flex gap-5 items-center cursor-pointer" onClick={()=>setShowModal(true)}>
  <MdLogout /> <span>Logout</span>
  </div>
</div>

</div>



{showModal && (
  <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 rounded-sm">
    <div className="bg-white rounded-lg w-1/2  shadow-lg relative">
      {/* Modal Heading */}
      <div className="bg-[#5B21B6] text-white text-center text-xl font-semibold py-2  rounded-t-lg mb-4">
        Logout
      </div>

      <p className="text-sm  mb-6 text-center">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-center py-5 gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-1  bg-gray-300 text-black rounded-full hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-white text-red-400 rounded-full border border-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}









    </>
  )
}

export default Sidebar