import { create } from "zustand";


export type ModalType = "navDialog" | "filterDialog";

// export type ModalStore = {
//   type: ModalType | null;
//   data: ModalData;
//   isOpen: boolean;
//   onOpen: (type: ModalType, data?: ModalData) => void;
//   onClose: () => void;
// };

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
};

// export const useModal = create<ModalStore>((set) => ({
export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type: ModalType) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
