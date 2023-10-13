import { useEffect, useState } from "react";
import { NavbarMobile } from "../../landing/navigation/navbar-mobile";
import { MobileFilter } from "../../courses/mobile-filter";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NavbarMobile />
      <MobileFilter />
    </>
  );
};
