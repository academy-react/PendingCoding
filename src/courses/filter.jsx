import { SearchInput } from "../components/search";
import { Seperator } from "../components/seperator";
import { PriceRange } from "../components/price-range";
import { CapacityItems } from "./capacity-items";
import { CategoryItem } from "./category-item";

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

export const Filter = ({ values, setValues }) => {
  return (
    <div className="hidden w-full max-w-[250px] 2xl:max-w-[280px] xl:flex flex-col justify-start items-start justify-self-end gap-y-5">
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
  );
};
