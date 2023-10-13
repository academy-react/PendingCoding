import { Link, NavLink } from "react-router-dom";
import { Dot, ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../../hooks/use-modal-store";

import { routes } from "../../components/routes/routes";

const backdrop = {
  hidden: {
    x: "-100px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const NavbarMobile = (count) => {
  const { isOpen, onClose, type } = useModal();
  const isDialogOpen = isOpen && type === "navDialog";

  return isDialogOpen ? (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 bg-gray-200 z-10"
        variants={backdrop}
        animate="visible"
        initial="hidden"
        exit="exit"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-full fixed top-0 left-0 z-20 flex flex-col items-center justify-start gap-y-5 bg-gray-50 border-r border-gray-200 shadow-md p-5"
        >
          <X
            className="self-start justify-self-start text-rose-700 cursor-pointer"
            onClick={onClose}
          />
          {routes.map((route) => (
            <div key={route.id}>
              <NavLink
                className="transition-all delay-75 p-1 text-lg"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid #505050" : "",
                  color: isActive ? "#7b7b7b" : "#bfbfbf",
                })}
                to={route.path}
                onClick={onClose}
              >
                {route.label}
              </NavLink>
            </div>
          ))}
          <Link
            className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
            to="/sing-in"
          >
            ورود
          </Link>
          <Link
            className="border-[3px] border-primary px-10 py-1 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white/90 transition font-semibold text-[16px]"
            to="/sign-up"
          >
            ثبت نام
          </Link>
          <div className="group relative cursor-pointer">
            <ShoppingCart className="h-8 w-8 group-hover:text-black/60 transition" />
            {count > 0 && (
              <Dot className="h-14 w-14 absolute -inset-6 z-10 text-primary group-hover:text-primary/60 transition" />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};
