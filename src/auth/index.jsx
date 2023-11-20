import { Register } from "./register/register";
import { Log } from "./register/log";
import { Login } from "./login/login";
import { Reg } from "./login/reg";
import { useAnimationControls } from "framer-motion";
import { useState } from "react";

const Auth = () => {
  const [show, setShow] = useState(false);

  const register = useAnimationControls();
  const log = useAnimationControls();

  const login = useAnimationControls();
  const reg = useAnimationControls();

  const handleAnimate = () => {
    register.start({
      x: "400px",
      transition: { duration: 1.4 },
      // opacity: "0",
      zIndex: "999"
    });
    log.start({
      x: "-400px",
      transition: { duration: 0.7 },
    });

    setTimeout(() => setShow(true) , 900)
  };

  const loginHandleAnimate = () => {
    login.start({
      x: "-400px",
      transition: { duration: 0.7 },
      zIndex: "999"
    });
    reg.start({
      x: "400px",
      transition: { duration: 0.7 },
    });

    setTimeout(() => setShow(false) , 900)
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-[50px_0_100px] select-none">
      <div
        className="w-[1110px] h-[700px] m-auto
       
       max-[1110px]:w-[clamp(100px,100%,700px)] max-[1110px]:h-[1200px] 
       max-[700px]:w-[500px] max-[700px]:h-[850px]"
      >
        {!show ? (
          <>
            <Register register={register} />
            <Log log={log} handleAnimate={handleAnimate} />
          </>
        ) : (
          <>
            <Login login={login} />
            <Reg reg={reg} loginHandleAnimate={loginHandleAnimate} />
          </>
        )}
      </div>
    </div>
  );
};

export { Auth };
