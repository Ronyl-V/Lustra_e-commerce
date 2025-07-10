"use client";
import React, { useState } from 'react';
import DealPage from '../Components/DealPage';
import SideBar from '../Components/SideBar';

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 h-screen z-50">
        <SideBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>

      <div
        className={`transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        } min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6`}
      >
        <DealPage />
      </div>
    </>
  );
};

export default Index;
