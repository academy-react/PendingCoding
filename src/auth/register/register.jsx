import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import { useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/providers/user-provider";

const Register = () => {
  const formSchema = z
    .object({
      email: z
        .string()
        .email({ message: "ایمیل نامعتبر" })
        .min(1, { message: "ایمیل خود را وارد کنید" }),
      password: z
        .string()
        .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
        .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
      confirmPassword: z
        .string()
        .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
        .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
      phoneNumber: z
        .string({ message: "شماره خود را وارد کنید" })
        .min(11, { message: "تعداد شماره باید 11 تا باشد" })
        .max(11, { message: "تعداد شماره باید 11 تا باشد" }),
      idNumber: z
        .string({ message: "کد ملی خود را وارد کنید" })
        .min(10, { message: "تعداد ارقام باید 10 تا باشد" })
        .max(10, { message: "تعداد ارقام باید 10 تا باشد" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "باید با رمز عبور یکسان باشد",
      path: ["confirmPassword"],
    });

  const { userData } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values) => {
    const newObj = {
      ...userData,
      user: { email: values.email, password: values.password },
    };

    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("با موافقیت وارد شدید");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // steps function

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center float-left relative
       
       max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >
      <div
        className="w-[350px] h-[460px] flex justify-center items-center flex-col      flex-nowrap
         
         max-[700px]:w-[275px]"
      >
        {step === 1 && (
          <>
            <h1
              className="text-[#505050] text-[28px] mb-[40px]
              
              max-[700px]:mb-[10px] max-[700px]:text-[26px]"
            >
              {" "}
              ثبت نام حساب کاربری{" "}
            </h1>

            <form className="w-[100%] flex flex-col">
              <input
                type="text"
                placeholder="پست الکترونیکی"
                className={cn(
                  `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
                  errors.email &&
                    `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]`
                )}
                {...register("email")}
              />

              {errors.email && (
                <div
                  className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              
              max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
                >
                  {errors.email?.message}
                </div>
              )}

              <input
                type="password"
                placeholder="رمز عبور"
                className={cn(
                  `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
                  errors.password &&
                    `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]`
                )}
                {...register("password")}
              />
              {errors.password && (
                <div
                  className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              
              max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
                >
                  {errors.password?.message}
                </div>
              )}

              <input
                type="password"
                placeholder="تکرار رمز عبور"
                className={cn(
                  `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                    
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
                  errors.confirmPassword &&
                    `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]`
                )}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <div
                  className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              
              max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
                >
                  {errors.confirmPassword?.message}
                </div>
              )}

              <div
                className="flex gap-[10px] m-[0_0_20px] items-center
                      
                      max-[700px]:m-[0_0_13px]"
              >
                <input
                  type="checkbox"
                  name="term"
                  id="term"
                  className="absolute invisible peer"
                />

                <label
                  htmlFor="term"
                  className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer
                          
                max-[700px]:w-[20px] max-[700px]:h-[20px]"
                >
                  {" "}
                </label>

                <label
                  htmlFor="term"
                  className="text-[12px] text-[#969696] cursor-pointer"
                >
                  {" "}
                  با{" "}
                  <Link to="/terms-and-conditions" className="text-[#02B2B8]">
                    قوانین و مقررات{" "}
                  </Link>
                  درج شده در آکادمی موافقم.{" "}
                </label>
              </div>

              <button
                onClick={handleNext}
                className="
              bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0]
                  
              max-[700px]:p-[7px_0]"
                type="submit"
              >
                {" "}
                مرحله بعد{" "}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1
              className="text-[#505050] text-[28px] mb-[40px]
                
                max-[700px]:mb-[10px] max-[700px]:text-[26px]"
            >
              {" "}
              ثبت نام حساب کاربری{" "}
            </h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[100%] flex flex-col"
            >
              <input
                type="text"
                placeholder="شماره موبایل"
                className={cn(
                  `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                    
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
                  errors.phoneNumber &&
                    `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]`
                )}
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div
                  className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              
                max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
                >
                  {errors.phoneNumber?.message}
                </div>
              )}

              <input
                type="text"
                placeholder="شماره ملی"
                className={cn(
                  `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                    
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
                  errors.idNumber &&
                    `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]`
                )}
                {...register("idNumber")}
              />
              {errors.idNumber && (
                <div
                  className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              
                max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
                >
                  {errors.idNumber?.message}
                </div>
              )}

              <button
                className="bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] mb-[20px]
              
              max-[700px]:p-[7px_0]"
                type="submit"
              >
                {" "}
                ثبت نام{" "}
              </button>

              <button
                onClick={handleBack}
                className="cursor-pointer rounded-[50px] text-[18px] text-[#505050] p-[10px] m-[0_auto]
              
              max-[700px]:p-[7px_0]"
              >
                {" "}
                مرحله قبل{" "}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export { Register };
