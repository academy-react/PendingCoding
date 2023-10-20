import { useEffect, useState } from "react";
import { NavbarMobile } from "../../landing/navigation/navbar-mobile";
import { MobileFilter } from "../../courses/mobile-filter";
import { ShareModal } from "../share-modal";
import { SendMessageModal } from "../send-message-modal";
import { RespondModal } from "../respond-modal";
import { ConfirmModal } from "../confirm-modal";
import { CartModal } from "../../landing/navigation/cart-modal";
import { ConfirmDeleteModal } from "../confirm-delete-modal";

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
      <ShareModal />
      <SendMessageModal />
      <RespondModal />
      <ConfirmModal />
      <ConfirmDeleteModal />
      <CartModal />
    </>
  );
};
