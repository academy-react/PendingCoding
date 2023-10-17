import { create } from "zustand";


export type ModalType = "navDialog" | "filterDialog" | "confirmModal" | "cartModal" | "shareModal" | "sendRespond";

type ModalData = {
  user?: {
    id: string;
    name: string;
    image: string
  };
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

