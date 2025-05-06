import React from 'react';
import Sidebar from './Components/Sidebar';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Layout = () => {
    const [pageTitle, setPageTitle] = useState("Candidates");
  return (
    <div className="flex h-screen m-5">
      <Sidebar setPageTitle={setPageTitle} />
      <div className="flex flex-col flex-1 ml-[240px]">
        <Header title={pageTitle} />
        <main className=" overflow-hidden mt-3 bg-gray-100 h-full rounded-lg">
          <Outlet />
        </main>
      </div> 
    </div>
  );
};

export default Layout;
