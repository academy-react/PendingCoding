import { Login } from "./login"
import { Reg } from "./reg"


const Holder = () => {
  return (
    <div className="border-[1px] border-red-600 border-solid w-[1110px] h-[700px]  mx-auto
    max-[1110px]:w-[700px] max-[1110px]:h-[1200px]">

        <Login />
        <Reg />

    </div>      
  )
}

export { Holder }