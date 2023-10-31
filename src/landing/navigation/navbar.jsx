import { useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dot, Menu, ShoppingCart } from "lucide-react";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../components/providers/user-provider";
import { useScrollTop } from "../../hooks/use-scroll-top";

import { routes } from "../../components/routes/routes";
import { NavbarMobile } from "./navbar-mobile";

import logo from "../../assets/logo.svg";
import { cn } from "../../../libs/utils";
import toast from "react-hot-toast";

const Navbar = () => {
  const { userData } = useUser();
  const { onOpen } = useModal();

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
        "w-full fixed top-0 bg-[#EEEEEE] flex items-center justify-between px-3 md:px-4 lg:px-16 xl:px-28 2xl:px-32 py-2",
        scrolled && "border-b border-gray-200 shadow-md"
      )}
    >
      <div className="flex w-full items-center justify-between mx-auto">
        <div className="flex justify-center items-center gap-x-2 lg:gap-x-6">
          <img className="h-12 w-12" src={logo} alt="logo" />
          {routes.map((route) => (
            <div key={route.id} className="hidden md:block">
              <NavLink
                className="transition-all delay-75 p-1 text-lg"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "2px solid #505050" : "",
                  color: isActive ? "#7b7b7b" : "#bfbfbf",
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
            <>
              <Link
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
                to="/sign-in"
              >
                ورود
              </Link>
              <Link
                className="border-[3px] border-primary px-10 py-1 rounded-full bg-primary hover:bg-primary/90 text-white hover:text-white/90 transition font-semibold text-[16px]"
                to="/sign-up"
              >
                ثبت نام
              </Link>
            </>
          )}
          <div
            onClick={() => onOpen("cartModal")}
            className="group relative cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6 group-hover:text-black/60 transition" />
            {count > 0 && (
              <Dot className="h-14 w-14 absolute -inset-6 z-10 text-primary group-hover:text-primary/60 transition" />
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
