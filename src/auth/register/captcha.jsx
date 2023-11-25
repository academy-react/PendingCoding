import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import refIMG from "../../assets/refresh.png";
import { useState } from "react";
import { ValidContext } from "./register";
import { useContext } from "react";

const Captcha = () => {
  const { setIsValid } = useContext(ValidContext);

  const formSchema = z.object({
    captcha: z.string().min(4, { message: "" }).max(4, { message: "" }),
  });

  const randomString = (Math.random() + 1)
    .toString(19)
    .toUpperCase()
    .substring(2, 6);
  const [captcha, setCapthat] = useState(randomString);

  const [check, setCheck] = useState(null);

  const refreshCaptcha = () => {
    setCapthat((Math.random() + 1).toString(19).toUpperCase().substring(2, 6));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values) => {
    const len = values.captcha.length;
    if (captcha === values.captcha && len === 4) {
      setCheck(true);
      setIsValid(true);
    } else {
      setCheck(false);
      setIsValid(false);
    }
  };

  return (
    <div className="relative top-[-128px] w-full flex gap-[5px]">
      <form
        className="w-[100%] flex gap-[5px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="کپچا را وارد کنید"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[75%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            check === true &&
              `border-green-500 text-green-500 placeholder-green-500 focus:border-green-500 
            dark:border-green-600 dark:placeholder-green-600 dark:text-green-600 dark:focus:border-green-600`,
            check === false &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`,
            errors.captcha &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                      dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("captcha")}
        />

        <button
          className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[17px] text-white w-[27%] p-[10px_0] transition hover:bg-[#626262] mb-[20px] h-[55px]
                dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                disabled:cursor-default disabled:hover:bg-[#505050] disabled:text-[20px] 
                 
                max-[700px]:p-[7px_0]"
          type="submit"
        >
          تایید
        </button>
      </form>

      <div className="min-w-[125px] h-[55px] flex justify-start items-center text-[22px] tracking-[3px] line-through font-bold italic border-[#505050] border-[3px] rounded-[50px] px-[10px] gap-[9px] text-[#3d3d3d] flex-row-reverse relative font-serif decoration-double">
        {captcha}
        <button
          onClick={refreshCaptcha}
          className="h-full w-[24px] flex justify-center items-center absolute right-[6px]"
        >
          <img className="w-full h-[54%]" src={refIMG} />
        </button>
      </div>
    </div>
  );
};

export { Captcha };
