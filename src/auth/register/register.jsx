// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "../../../libs/utils";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../../hooks/use-user";

import { useState } from "react";

import { motion } from "framer-motion";
import { ThirdStep } from "./third-step";
import { SecondStep } from "./second-step";

const Register = ({ register: reg }) => {
  // const formSchema = z
  //   .object({
  //     email: z
  //       .string()
  //       .email({ message: "ایمیل نامعتبر" })
  //       .min(1, { message: "ایمیل خود را وارد کنید" }),
  //     password: z
  //       .string()
  //       .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
  //       .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  //     confirmPassword: z
  //       .string()
  //       .min(4, { message: "رمز عبور حداقل 4 کاراکتر دارد" })
  //       .max(15, { message: "رمز عبور حداکثر 15 کاراکتر دارد" }),
  //     phoneNumber: z
  //       .string({ message: "شماره خود را وارد کنید" })
  //       .min(11, { message: "تعداد شماره باید 11 تا باشد" })
  //       .max(11, { message: "تعداد شماره باید 11 تا باشد" }),
  //     idNumber: z
  //       .string({ message: "کد ملی خود را وارد کنید" })
  //       .min(10, { message: "تعداد ارقام باید 10 تا باشد" })
  //       .max(10, { message: "تعداد ارقام باید 10 تا باشد" }),
  //   })
  //   .refine((data) => data.password === data.confirmPassword, {
  //     message: "باید با رمز عبور یکسان باشد",
  //     path: ["confirmPassword"],
  //   });

  // const { userData, setUserData } = useUser();
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(formSchema),
  // });

  // const onSubmit = (values) => {
  //   const newObj = {
  //     ...userData,
  //     user: { email: values.email, password: values.password },
  //   };
  //   localStorage.setItem("user", JSON.stringify(newObj));
  //   toast.success("با موافقیت وارد شدید");
  //   setTimeout(() => {
  //     navigate("/");
  //     setUserData(newObj);
  //   }, 500);
  // };

  // steps function

  const [userInfo, setUserInfo] = useState([]);

  const [step, setStep] = useState(1);

  // const handleNext = () => {
  //   setStep(step + 1);
  // };

  // const handleBack = () => {
  //   setStep(step - 1);
  // };

  return (
    <motion.div
      animate={reg}
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center float-left relative
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
              
              max-[700px]:mb-[10px] max-[700px]:text-[26px]"
        >
          {" "}
          ثبت نام حساب کاربری{" "}
        </h1>

        {step === 1 && (
          <ThirdStep
            setStep={setStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}

        {step === 2 && (
          <SecondStep
            setStep={setStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
      </div>
    </motion.div>
  );
};

export { Register };
