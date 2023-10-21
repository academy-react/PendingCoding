import { Log } from './log'
import { Register } from './register'

const RegHolder = () => {
  return (
    <div className="flex items-center justify-center w-full h-full my-20 select-none">
      <div 
       className="w-[1110px] h-[700px] m-auto max-[1110px]:w-[700px] max-[1110px]:h-[1200px]"
      >

        <Register />
        <Log />

      </div>
    </div>
)
}

export { RegHolder }