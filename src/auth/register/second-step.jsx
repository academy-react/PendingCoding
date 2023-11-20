// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "../../../libs/utils";

// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../../hooks/use-user";

// const SecondStep = ({ setStep, userInfo }) => {
//   const formSchema = z
//     .object({
//       phoneNumber: z
//         .string({ message: "شماره خود را وارد کنید" })
//         .min(11, { message: "تعداد شماره باید 11 تا باشد" })
//         .max(11, { message: "تعداد شماره باید 11 تا باشد" }),
//       idNumber: z
//         .string({ message: "کد ملی خود را وارد کنید" })
//         .min(10, { message: "تعداد ارقام باید 10 تا باشد" })
//         .max(10, { message: "تعداد ارقام باید 10 تا باشد" }),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//       message: "باید با رمز عبور یکسان باشد",
//       path: ["confirmPassword"],
//     });

//   const { userData, setUserData } = useUser();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = (values) => {
//     const newObj = {
//       ...userData,
//       user: { ...userInfo, email: values.email, password: values.password },
//     };
//     localStorage.setItem("user", JSON.stringify(newObj));
//     toast.success("با موافقیت وارد شدید");
//     setTimeout(() => {
//       navigate("/");
//       setUserData(newObj);
//     }, 500);

//     console.log(newObj);
//   };

//   const handleBack = () => {
//     setStep((cs) => cs - 1);
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-[100%] flex flex-col"
//       >
//         <input
//           type="text"
//           placeholder="شماره موبایل"
//           className={cn(
//             `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
//                   dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50
                    
//                 max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
//             errors.phoneNumber &&
//               `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
//                   dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
//           )}
//           {...register("phoneNumber")}
//         />
//         {errors.phoneNumber && (
//           <div
//             className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
//                   dark:text-red-500
              
//                 max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
//           >
//             {errors.phoneNumber?.message}
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="شماره ملی"
//           className={cn(
//             `focus:outline-none focus:border-[#989898]  block pr-[14px] bg-transparent w-[100%] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]
//                   dark:border-[rgb(181,188,200)] dark:placeholder-[rgb(181,188,200)] dark:focus:border-gray-50
                    
//                 max-[700px]:mb-[15px] max-[700px]:h-[50px] max-[700px]:text-[18px]`,
//             errors.idNumber &&
//               `border-[#ff3b3b] text-[#ff3b3b] placeholder-[#ff3434] focus:border-[#ff3b3b]
//                   dark:border-red-500 dark:placeholder-red-500 dark:text-red-500 dark:focus:border-red-500`
//           )}
//           {...register("idNumber")}
//         />
//         {errors.idNumber && (
//           <div
//             className="relative bottom-[25px] text-[#ff1f1f] right-[10px]
//                   dark:text-red-500
              
//                 max-[700px]:text-[13px] max-[700px]:bottom-[12px]"
//           >
//             {errors.idNumber?.message}
//           </div>
//         )}

//         <button
//           className="  bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[100%] p-[10px_0] transition hover:bg-[#626262]
//                 dark:bg-gray-600 dark:hover:bg-[rgb(87,98,115)]
                     
//                 max-[700px]:p-[7px_0]"
//           type="submit"
//         >
//           {" "}
//           ثبت نام{" "}
//         </button>

//         <button
//           onClick={handleBack}
//           className="cursor-pointer rounded-[50px] text-[18px] text-[#505050] p-[10px] m-[10px_auto]
//                 dark:text-gray-300
              
//               max-[700px]:p-[7px_0]"
//         >
//           {" "}
//           مرحله قبل{" "}
//         </button>
//       </form>
//     </>
//   );
// };

// export { SecondStep };