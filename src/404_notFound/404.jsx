import { Link } from "react-router-dom";
import logo from "../assets/404logo.svg";
import { Proposal } from "./ProposalComponent";

const NotFound = () => {

  return (

    <div className="flex justify-center items-center flex-col p-[0_40px_150px]">
      <img src={logo} className="my-[70px]" />

      <h1 className="text-[36px] text-[#505050]
      
      max-[700px]:text-center">
        این صفحه در آکادمی وجود ندارد !
      </h1>
      <p className="text-[20px] text-[#A4A4A4] m-[20px_0_30px]">
        {" "}
        صفحه مورد نظر یافت نشد.
      </p>

      <Link 
       to="/"
       className="
       bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[200px] p-[10px_0] text-center mb-[40px] hover:bg-[#A4A4A4]
          
       max-[700px]:mb-[30px]">  بازگشت 
      </Link>

      <p className="text-[22px] text-[#505050] p-[0_15px_0_300px] border-r-[#5C55C9] border-solid border-[3px] border-t-transparent border-b-transparent border-l-transparent mb-[50px]
      
      max-[460px]:mr-[80px]">
        {" "}
        صفحات پیشنهادی{" "}
      </p>

      <Proposal to={"/courses"} title={"دوره ها"} />
      <Proposal to={"/blogs"} title={"بلاگ"} />
      <Proposal to={"/teachers"} title={"اساتید"} />
      <Proposal to={"/contact-us"} title={"ارتباط با ما"} />

    </div>
  );
};

export { NotFound };
