import { Outlet } from "react-router-dom";

import Navbar from "./navigation/navbar";

export const LandingPage = () => {
  return (
    <div className="h-full w-full bg-[#EEEEEE]">
      <div className="flex justify-center items-center px-6 py-3 border-b border-gray-200 shadow-md">
        <Navbar />
      </div>
      <main className="bg-[#EEEEEE]">
        <Outlet />
      </main>
    </div>
  );
};
