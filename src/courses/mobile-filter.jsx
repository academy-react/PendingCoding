import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useModal } from "../hooks/use-modal-store";

import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { PriceRange } from "../components/price-range";
import { CapacityItems } from "./capacity-items";
import { CategoryItem } from "./category-item";
import { Select } from "../components/select";

const backdrop = {
  hidden: {
    x: "100px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "100px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const categories = [
  {
    id: "physics",
    label: "فیزیک",
  },
  {
    id: "math",
    label: "ریاضی",
  },
  {
    id: "chemistry",
    label: "شیمی",
  },
  {
    id: "computer",
    label: "کامپیوتر",
  },
  {
    id: "industry",
    label: "صنعت",
  },
  {
    id: "architecture",
    label: "معماری",
  },
  {
    id: "electricity",
    label: "برق",
  },
  {
    id: "paper",
    label: "بازار سهام",
  },
];

const capacities = [
  {
    id: "finished",
    label: "تکمیل شده",
  },
  {
    id: "not-finished",
    label: "تکمیل نشده",
  },
];

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "گران ترین",
    value: "expensive",
  },
  {
    id: 21,
    label: "ارزان ترین",
    value: "cheapest",
  },
  {
    id: 22,
    label: "محبوب ترین",
    value: "popular",
  },
];

export const MobileFilter = ({ values, setValues }) => {
  const { isOpen, onClose, type } = useModal();

  const isDialogOpen = isOpen && type === "filterDialog";

  return (
    isDialogOpen && (
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-0 w-full h-full bg-gray-300/50 z-10 xl:hidden"
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="exit"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-full fixed top-0 right-0 z-20 flex flex-col items-center justify-start gap-y-5 bg-gray-50 border-r border-gray-200 shadow-md p-5"
          >
            <X
              className="self-start justify-self-start text-rose-700 cursor-pointer"
              onClick={onClose}
            />
            <div className="flex flex-col items-center justify-center gap-y-5">
              <div className="w-full flex items-start justify-between gap-x-16">
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-base text-gray-500 mb-2">دسته بندی</h1>
                  {categories.map((category) => (
                    <CategoryItem
                      key={category.id}
                      label={category.label}
                      value={category.label}
                    />
                  ))}
                </div>
                <div className="w-5 border border-gray-500 mt-3" />
              </div>
              <Seperator />
              <div className="w-full flex items-start justify-between gap-x-16">
                <div className="flex flex-col justify-start items-start">
                  <h1 className="text-base text-gray-500 mb-2">ظرفیت</h1>
                  {capacities.map((capacity) => (
                    <CapacityItems
                      key={capacity.id}
                      label={capacity.label}
                      value={capacity.label}
                    />
                  ))}
                </div>
                <div className="w-5 border border-gray-500 mt-3" />
              </div>

              <Seperator />
              <div className="relative w-full flex justify-between items-start">
                <PriceRange values={values} setValues={setValues} />
                <div className="w-5 absolute left-0 border border-gray-500 mt-3" />
              </div>
              <Seperator />
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col justify-center items-start gap-y-2 w-full">
                  <h4 className="text-sm text-gray-500">استاد</h4>
                  <SearchInput
                    queryName="teacher_name"
                    className="w-full text-sm py-2 px-4"
                    placeholder="جستجو بر اساس استاد مورد نظر. . ."
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-center w-full gap-y-5">
              <div>
                <SearchInput
                  queryName="course_name"
                  placeholder="جستجو کنید ..."
                  className="px-4 py-2"
                />
              </div>
              <div className="flex justify-center items-center gap-x-5">
                <Select
                  queryName="courseFilterBy"
                  placeholder="جستجو بر اساس"
                  filters={orderBy}
                  className="py-3 px-5"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
