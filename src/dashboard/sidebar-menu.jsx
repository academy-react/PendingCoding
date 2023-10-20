import { Link } from "react-router-dom";
import {  LogOut, UserCog } from "lucide-react";

import { PageCard } from "./page-card";
import { pages } from "./pages";

export const SidebarMenu = () => {
  return (
    <div className="w-[250px] h-full bg-white border-l-2 border-l-gray-100 shadow-lg py-10">
      <h1 className="text-xl text-gray-700 mb-24 text-center">PendingCoding</h1>
      <div className="flex flex-col items-center justify-between h-4/5">
        <div className="flex flex-col justify-center items-center gap-y-2">
          {pages.map((page) => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Link
            to="/dashboard/edit-profile"
            className="group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 px-6 py-4 rounded-xl cursor-pointer hover:bg-gray-100 transition"
          >
            <h1 className="group-hover:text-gray-900 text-gray-600">
              ویرایش پروفایل
            </h1>
            <div className="group-hover:text-primary text-gray-600">
              <UserCog className="h-6 w-6" />
            </div>
          </Link>
          <Link
            to="/"
            className="group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 px-6 py-4 rounded-xl cursor-pointer hover:bg-gray-100 transition"
          >
            <h1 className="group-hover:text-gray-900 text-gray-600">خروج</h1>
            <div className="group-hover:text-primary text-gray-600">
              <LogOut className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
