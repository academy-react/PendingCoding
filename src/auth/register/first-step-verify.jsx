import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";
import { verifyMessage } from "../../core/services/api/auth";

const VerifyCode = ({ setStep, saveUser }) => {
  const formSchema = z.object({
    verifyCode: z
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

  const onSubmit = async (values) => {
      const obj = {
        phoneNumber: saveUser.phoneNumber,
        verifyCode: values.verifyCode,
      };

      const verifyMessageAPI = await verifyMessage(obj);
      setStep((cs) => cs + 1);

      console.log(verifyMessageAPI);
  };

  return (
    <>
      <form
        className="w-[100%] flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="کد تایید"
          className={cn(
            `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[63%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[40px]
                  dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50 dark:text-white
                  
                max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
            errors.verifyCode &&
              `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
                  dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
          )}
          {...register("verifyCode")}
        />
        {errors.verifyCode && (
          <div
            className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
                  dark:text-red-500
              
              max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
          >
            {errors.verifyCode?.message}
          </div>
        )}

        <button
          className="
                bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] transition hover:bg-[#626262]
                dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                 
                max-[700px]:p-[7px_0]"
          type="submit"
        >
          {" "}
          مرحله بعد{" "}
        </button>
      </form>
    </>
  );
};

export { VerifyCode };
