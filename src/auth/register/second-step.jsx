import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/providers/user-provider";

const formSchema = z.object({
  phoneNumber: z
    .string({ message: "شماره خود را وارد کنید" })
    .min(11, { message: "تعداد شماره باید 11 تا باشد" })
    .max(11, { message: "تعداد شماره باید 11 تا باشد" }),
  idNumber: z
    .string({ message: "کد ملی خود را وارد کنید" })
    .min(10, { message: "تعداد ارقام باید 10 تا باشد" })
    .max(10, { message: "تعداد ارقام باید 10 تا باشد" }),
});

const SecondStep = ({ setStep, userInfo }) => {
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
      user: {
        ...userInfo,
        phoneNumber: values.phoneNumber,
        idNumber: values.idNumber,
      },
    };

    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("با موافقیت وارد شدید");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleBack = () => {
    setStep((cs) => cs - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] flex flex-col">
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
  );
};

export { SecondStep };
