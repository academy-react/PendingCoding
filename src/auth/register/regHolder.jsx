import { Log } from './log'
import { Register } from './register'

const RegHolder = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-[50px_0_100px] select-none">
      <div 
       className="w-[1110px] h-[700px] m-auto
       
       max-[1110px]:w-[clamp(100px,100%,700px)] max-[1110px]:h-[1200px] 
       max-[700px]:w-[500px] max-[700px]:h-[850px]"
      >

        <Register />
        <Log />

      </div>
    </div>
)
}

export { RegHolder }