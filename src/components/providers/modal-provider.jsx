import { useEffect, useState } from "react";
import { NavbarMobile } from "../../landing/navigation/navbar-mobile";
import { MobileFilter } from "../../courses/mobile-filter";
import { ShareModal } from "../../courses/[courseId]/share-modal";
import { SendMessageModal } from "../../courses/[courseId]/send-message-modal";
import { RespondModal } from "../../courses/[courseId]/respond-modal";

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
    </>
  );
};
