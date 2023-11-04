import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { Search } from "lucide-react";

import { cn } from "../../libs/utils";
import { useDebounce } from "../hooks/use-debounce";

export const SearchInput = ({ queryName, placeholder, className }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const debouncedValue = useDebounce(value);
  const pathname = useMemo(() => window.location.pathname, []);
  const [searchParams] = useSearchParams();

  const courseFilterBy = searchParams.get("courseFilterBy");
  const itemsPerPage = searchParams.get("items-per-page");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          [queryName]: debouncedValue,
          courseFilterBy,
          itemsPerPage,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    navigate(url);
  }, [debouncedValue, navigate, pathname, queryName, courseFilterBy]);

  return (
    <div className="relative w-full">
      <Search className="h-6 w-6 absolute top-1/4 left-2 text-slate-500/90" />
      <input
        value={value}
        className={cn(
          "disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-200/80 text-gray-500 dark:text-gray-800 border-2 dark:border-gray-700 rounded-full duration-200 border-gray-300 focus:border-gray-400 dark:focus:border-gray-300/80",
          className
        )}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
