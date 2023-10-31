import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useModal } from "../hooks/use-modal-store";
import { useUser } from "./providers/user-provider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

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

export const ConfirmModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { userData, addToCart } = useUser();
  const { data } = useQuery({
    queryKey: ["courseId"],
    enabled: false,
  });

  const isModalOpen = isOpen && type === "confirmModal";

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
            className="fixed inset-0 w-96 h-fit m-auto bg-white rounded-xl p-3 z-50"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            {!userData?.user ? (
              <div className="flex flex-col justify-center items-center gap-y-10 my-5">
                <h1 className="text-xl text-gray-700">
                  آیا از خرید این دوره مطمئنید؟
                </h1>
                <div className="w-full flex items-center justify-start gap-x-3 px-5 py-2">
                  <button
                    onClick={() => addToCart(data?.data)}
                    className="px-5 py-2 text-lg bg-primary hover:bg-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/90 rounded-xl"
                  >
                    تائید
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-lg bg-destructive hover:bg-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/90 rounded-xl"
                  >
                    لغو
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-y-10 my-5">
                <h1 className="text-xl">ابتدا وارد حساب خود شوید</h1>
                <Link
                  to="/sign-in"
                  className="border-[3px] border-primary px-10 py-1 rounded-full bg-white-100 hover:bg-gray-100 text-primary hover:text-primary/90 transition font-semibold text-[16px]"
                >
                  ورود به حساب
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
