import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useModal } from "../../hooks/use-modal-store";
import { useUser } from "../../components/providers/user-provider";
import { CartItem } from "./cart-item";
import { cn } from "../../../libs/utils";

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

export const CartModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { userData } = useUser();
  const isModalOpen = isOpen && type === "cartModal";

  return (
    isModalOpen && (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-300/50 z-10"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "fixed inset-0 w-fit h-[450px] m-auto bg-white rounded-xl p-3 z-50",
              userData.cart.length>1 && "overflow-y-auto"
            )}
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="my-5 px-5 flex flex-col justify-center items-center gap-y-10">
              {userData.cart.length > 0 ? (
                userData?.cart.map((course) => (
                  <CartItem key={course.id} course={course} />
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <h1 className="text-xl text-gray-700">
                    سبد خرید شما خالی است!
                  </h1>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
