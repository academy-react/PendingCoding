import { useState } from "react";

import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";

const Register = () => {
  const [userInfo, setUserInfo] = useState([]);

  const [step, setStep] = useState(1);

  return (
    <div
      className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center float-left relative
       
       max-[700px]:w-[500px] max-[700px]:h-[500px]"
    >
      <div
        className="w-[350px] h-[460px] flex justify-center items-center flex-col      flex-nowrap
         
         max-[700px]:w-[275px]"
      >
        <h1
          className="text-[#505050] text-[28px] mb-[40px]
              
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
          <SecondStep
            setStep={setStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
      </div>
    </div>
  );
};

export { Register };
