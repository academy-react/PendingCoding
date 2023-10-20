import { Outlet } from "react-router-dom";

import Navbar from "./navigation/navbar";
import { Footer } from "./footer/footer";
import { ModalProvider } from "../components/providers/modal-provider";

export const LayoutPage = () => {
  return (
    <div className="h-full w-full bg-[#EEEEEE]">
      <div className="flex justify-center items-center px-6 py-3 border-b border-gray-200 shadow-md">
        <Navbar />
      </div>
      <main className="bg-[#EEEEEE]">
        <ModalProvider />
        <Outlet />
      </main>
      <div className="flex justify-center items-center px-6 py-2 bg-[#464646]">
        <Footer />
      </div>
    </div>
  );
};
