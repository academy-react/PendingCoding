import { create } from "zustand";

// import { Course } from "../types";

// export type ModalType = "createCourse" | "deleteCourse" | "updateCourse";
// export

// type ModalData = {
//   course?: Course;
// };

// type ModalStore = {
//   type: ModalType | null;
//   data: ModalData;
//   isOpen: boolean;
//   onOpen: (type: ModalType, data?: ModalData) => void;
//   onClose: () => void;
// };

// export const useModal = create<ModalStore>((set) => ({
export const useModal = create((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (data = {}) => set({ isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
