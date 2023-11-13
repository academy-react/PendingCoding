import { useRef } from "react";

import { InputErrorMessage } from "./input-error-message";
import { ImagePlus } from "lucide-react";

export const ImageUpload = ({ setIsLoading, setUrl, errors }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      setUrl(URL.createObjectURL(e.target.files[0]));
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <label
        id="image"
        htmlFor="image"
        onClick={handleClick}
        className="group flex flex-col justify-center items-center gap-y-2 cursor-pointer"
      >
        <ImagePlus className="w-16 h-16 text-primary group-hover:text-primary/80 transition" />
        <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-300/80 transition">
          اضافه کردن تصویر
        </p>
      </label>
      <input
        name="image"
        id="image"
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        placeholder="عکس خود را آپلود کنید"
        className={`hidden outline-none w-full text-gray-500 dark:text-gray-300 border-2 rounded-md px-4 py-2 duration-200 focus:border-blue-600 ${
          Object.prototype.hasOwnProperty.call(errors, "image") &&
          "border-red-500 dark:border-red-500/70"
        } `}
        onChange={handleChange}
      />
      <InputErrorMessage name="image" errors={errors} />
    </>
  );
};
