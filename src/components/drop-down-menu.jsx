import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../libs/utils";

const backdrop = {
  hidden: {
    y: "-200px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: "100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const DropDownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MoreVertical
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 text-gray-500 hover:text-gray-800 transition cursor-pointer"
      />
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "absolute bg-gray-50 border-2 border-gary-200 shadow-sm rounded-lg px-5 py-2 z-50",
          !isOpen && "hidden"
        )}
      >
        <div className="flex flex-col justify-center items-center gap-y-2">
          {children}
        </div>
      </div>
    </>
  );
};
