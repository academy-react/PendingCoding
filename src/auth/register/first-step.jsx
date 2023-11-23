import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import { VerifyCode } from "./first-step-verify";
import { useState } from "react";
import { sendVerifyMessage } from "../../core/services/api/auth";

const FirstStep = ({ setStep, setSaveUser, saveUser }) => {
  const formSchema = z.object({
    phoneNumber: z
      .string()
      .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
      .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [timerText, setTimerText] = useState("دریافت کد");

  const [loading, setLoading] = useState(false);

  // const onSubmit = (values) => {
  //   const newObj = [values.phoneNumber];
  //   setUserInfo(...newObj);

  //   setLoading(true);

  //   setTimerText(10);
  //   const interval = setInterval(() => {
  //     setTimerText((prevCounter) => {
  //       if (prevCounter <= 1) {
  //         setLoading(false);
  //         clearInterval(interval);
  //         return "دریافت مجدد";
  //       } else {
  //         return prevCounter - 1;
  //       }
  //     });
  //   }, 1000);

  //   console.log(newObj , timerText)
  // };

  const onSubmit = async (values) => {
    setSaveUser({ phoneNumber: values.phoneNumber });

    const sendVerifyMessageAPI = await sendVerifyMessage(values);

    setLoading(true);

    setTimerText(10);
    const interval = setInterval(() => {
      setTimerText((prevCounter) => {
        if (prevCounter <= 1) {
          setLoading(false);
          clearInterval(interval);
          return "دریافت مجدد";
        } else {
          return prevCounter - 1;
        }
      });
    }, 1000);

    console.log(sendVerifyMessageAPI)
  };

  return (
    <>
      <form
        className="w-[100%] flex flex-col relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          value={saveUser.phoneNumber}
          placeholder="شماره موبایل"
          className={cn(
            `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            errors.phoneNumber &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("phoneNumber")}
        />

        {errors.phoneNumber && (
          <div
            className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
                  dark:text-red-500
              
              max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
          >
            {errors.phoneNumber?.message}
          </div>
        )}

        <button
          disabled={loading}
          className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[17px] text-white w-[35%] p-[10px_0] transition hover:bg-[#626262] mb-[20px] absolute top-[85px] left-[0] h-[55px]
                dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                disabled:cursor-default disabled:hover:bg-[#505050] disabled:text-[20px] 
                 
                max-[700px]:p-[7px_0]"
          type="submit"
        >
          {timerText}
        </button>
      </form>

      <VerifyCode setStep={setStep} saveUser={saveUser} />
    </>
  );
};

export { FirstStep };
