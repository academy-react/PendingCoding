import { useState } from "react";
import { motion } from "framer-motion";
import { ThirdStep } from "./third-step";
import { FirstStep } from "./first-step";

const Register = ({ register: reg }) => {
  const [userInfo, setUserInfo] = useState([]);

  const [step, setStep] = useState(1);

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
          <FirstStep
            setStep={setStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}

        {step === 2 && (
          <ThirdStep
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
