import { Login } from "./login";
import { Reg } from "./reg";

const Holder = () => {
  return (
    <div className="flex items-center justify-center w-full h-full my-20">
      <div className="w-[1110px] h-[700px] m-auto max-[1110px]:w-[700px] max-[1110px]:h-[1200px]">
        <Login />
        <Reg />
      </div>
    </div>
  );
};

export { Holder };
