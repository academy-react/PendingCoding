import { useMemo } from "react";
import { Link } from "react-router-dom";

import { cn } from "../../libs/utils";

export const PageCard = ({ page }) => {
  const pathname = useMemo(() => window.location.pathname, []);

  const isActive = pathname === page.to;

  return (
    <Link
      to={page.to}
      className={cn(
        "group w-full flex flex-row-reverse justify-end items-center gap-x-3 border-2 border-gray-100 px-6 py-4 rounded-xl cursor-pointer hover:bg-gray-100 text-gray-500 transition shadow-none",
        isActive && "text-gray-800 bg-gray-100"
      )}
    >
      {page.label}
      <div
        className={cn(
          "group-hover:text-primary text-gray-500",
          isActive && "text-primary"
        )}
      >
        {page.icon}
      </div>
    </Link>
  );
};
