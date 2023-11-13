import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { SidebarMenu } from "./sidebar-menu";
import { Loading } from "../components/loading";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const timeOut = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timeOut);
  }, []);

  if (isLoading)
    return (
      <div className="fixed inset-0 dark:bg-gray-800">
        <Loading />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center items-center gap-x-8 bg-[#EEEEEE] dark:bg-gray-800">
      {/* SideBar menu */}
      <SidebarMenu />
      {/* Datas */}
      <main className="w-full h-full ">
        <Outlet />
      </main>
    </div>
  );
};
