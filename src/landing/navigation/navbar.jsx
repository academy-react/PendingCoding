import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { Dot, Menu, ShoppingCart } from "lucide-react";

import { useModal } from "../../hooks/use-modal-store";
import { useScrollTop } from "../../hooks/use-scroll-top";
import { useUser } from "../../components/providers/user-provider";

import { NavbarMobile } from "./navbar-mobile";
import { ThemeToggle } from "../../components/theme-toggle";

import { cn } from "../../../libs/utils";

import { routes } from "../../components/routes/routes";
import { useTheme } from "../../components/providers/theme-provider";

const Navbar = () => {
  const { userData } = useUser();
  const { onOpen } = useModal();
  const { isDarkTheme } = useTheme();

  const count = useMemo(() => userData?.cart?.length, [userData?.cart?.length]);
  const scrolled = useScrollTop();

  const handleLogout = () => {
    const newObj = {
      ...userData,
      user: null,
    };

    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("با موفقیت خارج شدید");
  };

  const isSignIn = useMemo(() => userData.user, [userData]);

  return (
    <nav
      className={cn(
        "w-full fixed top-0 bg-[#EEEEEE] dark:bg-gray-800 flex items-center justify-between px-3 md:px-4 lg:px-16 xl:px-28 2xl:px-32 py-2",
        scrolled && "border-b border-gray-200 dark:border-gray-600 shadow-md"
      )}
    >
      <div className="flex w-full items-center justify-between mx-auto">
        <div className="flex justify-center items-center gap-x-2 lg:gap-x-6">
          <ThemeToggle />
          {routes.map((route) => (
            <div key={route.id} className="hidden md:block">
              <NavLink
                className="transition-all delay-75 p-1 text-lg"
                style={({ isActive }) => ({
                  borderBottom: isActive
                    ? isDarkTheme
                      ? "2px solid #939393"
                      : "2px solid #505050"
                    : "",
                  color: isActive
                    ? isDarkTheme
                      ? "#cecece"
                      : "#7b7b7b"
                    : isDarkTheme
                    ? "#909090"
                    : "#bfbfbf",
                })}
                to={route.path}
              >
                {route.label}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="hidden md:flex items-center justify-center gap-x-1 lg:gap-x-6">
          {isSignIn ? (
            <>
              <Link
                to="/dashboard"
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
              >
                داشبورد
              </Link>
              <button
                onClick={handleLogout}
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
              >
                خروج
              </button>
            </>
          ) : (
            <Link
              className="border-[3px] border-primary dark:border-dark-primary px-5 py-1 rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition font-semibold text-[16px]"
              to="/sign-in"
            >
              ورود / ثبت نام
            </Link>
          )}
          <div
            onClick={() => onOpen("cartModal")}
            className="group relative cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6 group-hover:text-black/60 dark:text-gray-400 dark:group-hover:text-gray-300 transition" />
            {count > 0 && (
              <Dot className="h-14 w-14 absolute -inset-6 z-10 text-primary group-hover:text-primary/60 dark:text-dark-primary dark:group-hover:text-dark-primary/60 transition" />
            )}
          </div>
        </div>
        <div className="md:hidden">
          <Menu
            onClick={() => onOpen("navDialog")}
            className="h-8 w-8 cursor-pointer hover:text-black/60 transition"
          />
          <NavbarMobile count={count} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
