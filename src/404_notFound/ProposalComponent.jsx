import { Link } from "react-router-dom";

const Proposal = ({to , title}) => {
  return (
    <div className="relative h-[87px] w-[clamp(100px,95%,489px)] border-solid border-[1px] border-[#A4A4A4] rounded-[200px] overflow-hidden mb-[30px]">
    <div className="w-[clamp(50px,100%,108px)] h-full bg-[#A4A4A4] "> </div>
    <Link 
     to={to}
     className="w-full h-full absolute top-0 cursor-pointer text-center leading-[87px] text-[33px] text-[#A4A4A4]"
    >
        {title}
    </Link>
  </div>
  )
}

export { Proposal }