

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../../../libs/utils";

import { Link } from "react-router-dom";



const Login = () => {
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
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values) => {
    console.log("form updated...!!!", values);
  };

  return (
    <div
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center relative
       
       max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >
      <div
        className="w-[350px] h-[460px] flex justify-center items-center flex-col      flex-nowrap
         
         max-[700px]:w-[275px]"
      >
        <h1
          className="text-[#505050] text-[28px] mb-[40px]
             
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
                 
              max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
              errors.email && `border-[#ff3b3b]`
            )}
            {...register("email")}
          />
          {/* width to 100% */}

          {errors.email && (
            <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
            
            max-[700px]:text-[13px] max-[700px]:bottom-[12px]">
              {errors.email?.message}
            </div>
          )}

          <input
            type="password"
            placeholder="رمز عبور"
            className={cn(
              `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
                 
              max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
              errors.password && `border-[#ff3b3b]`
            )}
            {...register("password")}
          />
          {errors.password && (
            <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
            
            max-[700px]:text-[13px] max-[700px]:bottom-[12px]">
              {errors.password?.message}
            </div>
          )}

          <div className="flex gap-[10px] m-[40px_0] items-center justify-between
          
          max-[700px]:m-[20px_0_25px]">

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
              className="text-[12px] text-[#969696] cursor-pointer"
            >
              مرا به خاطر بسپار
            </label>
            </div>

            <Link className="text-[12px] text-[#969696] cursor-pointer text-center">
              {" "}
              رمز عبور را فراموش کرده ام{" "}
            </Link>
          </div>

          <button
            className="
            bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0]
                 
            max-[700px]:p-[7px_0]"
            type="submit"
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





// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import { Link } from "react-router-dom";

// const formSchema = z.object({
//   email: z
//     .string()
//     .email({ message: "ایمیل نامعتبر" })
//     .min(1, { message: "ایمیل خود را وارد کنید" }),
//   password: z
//     .string()
//     .min(4, "رمز عبور حداقل 4 کاراکتر دارد")
//     .max(15, "رمز عبور حداکثر 15 کاراکتر دارد"),
// });

// const Login = () => {
//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     resolver: zodResolver(formSchema),
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values) => {
//     console.log(values);
//   };

//   return (
//     <div className="w-[700px] h-[700px] bg-[#EEEEEE] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center relative">
//       <div className="w-[350px] height-[460px] flex justify-center items-center flex-col flex-wrap select-none">
//         <h1 className="text-[#505050] text-[28px] mb-[50px]">
//           {" "}
//           ورود به حساب کاربری{" "}
//         </h1>

//         <form onSubmit={form.handleSubmit(onSubmit)}>
          // <input
          //   type="text"
          //   placeholder="پست الکترونیکی"
          //   {...form.register("email")}
          //   className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[40px]"
          // />

//           {form.formState.errors.email && (
//             <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]">
//               {" "}
//               {form.formState.errors.email?.message}{" "}
//             </div>
//           )}

//           <input
//             type="password"
//             placeholder="رمز عبور"
//             {...form.register("password")}
//             className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[40px]"
//           />

//           {form.formState.errors.password && (
//             <div className="relative bottom-[25px] text-[#ff1f1f] right-[10px]">
//               {" "}
//               {form.formState.errors.password?.message}{" "}
//             </div>
//           )}

//           <div className="flex gap-[10px] m-[40px_0] items-center justify-between">
//             <input
//               type="checkbox"
//               name="remember"
//               id="remember"
//               className="absolute invisible peer"
//             />

//             <label
//               htmlFor="remember"
//               className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer"
//             >
//               {" "}
//             </label>

//             <label
//               htmlFor="remember"
//               className="text-[12px] text-[#969696] pl-[75px] cursor-pointer"
//             >
//               مرا به خاطر بسپار
//             </label>

//             <Link className="text-[12px] text-[#969696] cursor-pointer">
//               {" "}
//               رمز عبور را فراموش کرده ام{" "}
//             </Link>
//           </div>

//           <button
//             disabled={isSubmitting || !isValid}
//             type="submit"
//             className="bg-[#505050] disabled:bg-[#505050]/80 disabled:text-white/80 transition disabled:cursor-not-allowed cursor-pointer rounded-[50px] text-[18px] text-white w-[344px] p-[10px_0]"
//           >
//             {" "}
//             ورود{" "}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export { Login };
