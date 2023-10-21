import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "ایمیل نامعتبر" })
    .min(1, { message: "ایمیل خود را وارد کنید" }),
  password: z
    .string()
    .min(4, "رمز عبور حداقل 4 کاراکتر دارد")
    .max(15, "رمز عبور حداکثر 15 کاراکتر دارد"),
});

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <div className="w-[700px] h-[700px] bg-[#EEEEEE] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center relative">
      <div className="w-[350px] height-[460px] flex justify-center items-center flex-col flex-wrap select-none">
        <h1 className="text-[#505050] text-[28px] mb-[50px]">
          {" "}
          ورود به حساب کاربری{" "}
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="پست الکترونیکی"
            {...form.register("email")}
            className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[40px]"
          />

          {form.formState.errors.email && (
            <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]">
              {" "}
              {form.formState.errors.email?.message}{" "}
            </div>
          )}

          <input
            type="password"
            placeholder="رمز عبور"
            {...form.register("password")}
            className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[40px]"
          />

          {form.formState.errors.password && (
            <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]">
              {" "}
              {form.formState.errors.password?.message}{" "}
            </div>
          )}

          <div className="flex gap-[10px] m-[40px_0] items-center justify-between">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className="absolute invisible peer"
            />

            <label
              htmlFor="remember"
              className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer"
            >
              {" "}
            </label>

            <label
              htmlFor="remember"
              className="text-[12px] text-[#969696] pl-[75px] cursor-pointer"
            >
              مرا به خاطر بسپار
            </label>

            <Link className="text-[12px] text-[#969696] cursor-pointer">
              {" "}
              رمز عبور را فراموش کرده ام{" "}
            </Link>
          </div>

          <button
            disabled={isSubmitting || !isValid}
            type="submit"
            className="bg-[#505050] disabled:bg-[#505050]/80 disabled:text-white/80 transition disabled:cursor-not-allowed cursor-pointer rounded-[50px] text-[18px] text-white w-[344px] p-[10px_0]"
          >
            {" "}
            ورود{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };
