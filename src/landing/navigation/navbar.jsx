import { Link, NavLink } from "react-router-dom";
import { Dot, Menu, ShoppingCart } from "lucide-react";

import { routes } from "../../components/routes";

import logo from "../../assets/logo.svg";
import { useState } from "react";
import { NavbarMobile } from "./navbar-mobile";
import { useModal } from "../../hooks/use-modal-store";

const Navbar = () => {
  const [count] = useState(1);
  const { isOpen, onOpen, onClose } = useModal();

  const onClick = () => {
    onOpen();
  };

  return (
    <nav className="flex flex-1 items-center justify-between">
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
        <div className="group relative cursor-pointer ">
          <ShoppingCart className="h-6 w-6 group-hover:text-black/60 transition" />
          {count > 0 && (
            <Dot className="h-14 w-14 absolute -inset-6 z-10 text-primary group-hover:text-primary/60 transition" />
          )}
        </div>
      </div>
      <div className="md:hidden">
        <Menu
          onClick={onClick}
          className="h-8 w-8 cursor-pointer hover:text-black/60 transition"
        />
        <NavbarMobile isOpen={isOpen} onClose={onClose} count={count} />
      </div>
    </nav>
  );
};

export default Navbar;
