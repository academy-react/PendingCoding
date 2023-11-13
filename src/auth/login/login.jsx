import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import toast from "react-hot-toast";
import { motion } from "framer-motion";


const Login = ({ login }) => {
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "ایمیل نامعتبر" })
      .min(1, { message: "ایمیل خود را وارد کنید" }),
    password: z
      .string()
      .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
      .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  });

  const { userData, setUserData } = useUser();
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
      setUserData(newObj);
    }, 500);
  };

  return (
    <motion.div
      animate={login}
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center relative transition
      dark:bg-gray-800 dark:border-gray-600
       
      max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >
      <div
        className="w-[350px] h-[460px] flex justify-center items-center flex-col      flex-nowrap
         
         max-[700px]:w-[275px]"
      >
        <h1
          className="text-[#505050] text-[28px] mb-[40px]
          dark:text-gray-300
             
          max-[700px]:mb-[20px] max-[700px]:text-[26px]"
        >
          {" "}
          ورود به حساب کاربری{" "}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%]">
          <input
            type="text"
            placeholder="پست الکترونیکی"
            className={cn(
              `focus:outline-none focus:border-[#989898] block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
              dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50
                 
              max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
              errors.email &&
                `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
            )}
            {...register("email")}
          />
          {/* width to 100% */}

          {errors.email && (
            <div
              className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              dark:text-red-500
            
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
              dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50
                 
              max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
              errors.password &&
                `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
            )}
            {...register("password")}
          />
          {errors.password && (
            <div
              className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
              dark:text-red-500
            
            max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
            >
              {errors.password?.message}
            </div>
          )}

          <div
            className="flex gap-[10px] m-[40px_0] items-center justify-between text-[#969696]
            dark:text-gray-200
          
          max-[700px]:m-[20px_0_25px]"
          >
            <div className="flex gap-[10px] items-center justify-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="absolute invisible peer"
              />

              <label
                htmlFor="remember"
                className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer
              
              max-[700px]:w-[20px] max-[700px]:h-[20px]"
              >
                {" "}
              </label>

              <label
                htmlFor="remember"
                className="text-[12px] cursor-pointer"
              >
                مرا به خاطر بسپار
              </label>
            </div>

            <Link className="text-[12px] cursor-pointer text-center">
              {" "}
              رمز عبور را فراموش کرده ام{" "}
            </Link>
          </div>

          <button
            className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] transition hover:bg-[#626262]
            dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                 
            max-[700px]:p-[7px_0]"
            type="submit"
          >
            {" "}
            ورود{" "}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export { Login };