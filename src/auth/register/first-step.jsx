import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import { Link } from "react-router-dom";

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "باید با رمز عبور یکسان باشد",
    path: ["confirmPassword"],
  });

const FirstStep = ({ setStep, setUserInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values) => {
    const newObj = [values.email, values.password];
    setUserInfo(...newObj);
    setStep((cs) => cs + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] flex flex-col">
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
        className="
    bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0]
        
    max-[700px]:p-[7px_0]"
        type="submit"
      >
        {" "}
        مرحله بعد{" "}
      </button>
    </form>
  );
};

export { FirstStep };
