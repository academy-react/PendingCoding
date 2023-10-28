import { Link } from "react-router-dom";

const Reg = () => {
  return (
    <div className="w-[700px] h-[700px] rounded-[100%] bg-[#505050] flex float-left mt-[-700px] justify-end items-center  text-white text-center 
    
    max-[1110px]:mt-[-200px] max-[1110px]:justify-center
    max-[700px]:w-[500px] max-[700px]:h-[500px] max-[700px]:mt-[-150px]">
      {" "}
      {/* {style.reg} */}
      <div className="w-[380px] ml-[30px] flex flex-col flex-wrap gap-[25px] items-center max-[1110px]:m-[100px_0_0_0]
      
      max-[700px]:gap-[15px]">
        {" "}
        {/* {style.main} */}
        <h1 className="text-[24px] m-[0_0_10px]
        
        max-[700px]:m-[0]">
          هنوز ثبت نام نکرده ایید؟
        </h1>{" "}
        {/* {style.title} */}
        <p className="text-[14px]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با
          استفاده از طراحان گرافیک است
        </p>{" "}
        {/* {style.p} */}
        <p className="text-[14px] w-[320px]">
          لطفا برای ثبت نام ابتدا{" "}
          <Link className="cursor-pointer text-[#00FFF6]">قوانین و مقررات </Link>
          آکادمی پندینگ کدینگ را مطالعه وسپس برای ثبت نام اقدام فرمایید
        </p>{" "}
        {/* {style.p} */}
        <button className="text-[#505050] bg-[#EEEEEE] rounded-[50px] text-[18px] p-[10px_0] w-[300px] m-[20px_0] hover:bg-[#DDDDDD]
        
        max-[700px]:p-[7px_0] max-[700px]:w-[270px] overflow-hidden relative">
          <Link to="/sign-up" className="w-full h-full absolute cursor-pointer top-0 left-0"></Link>
          ثبت نام
        </button>{" "}
        
      </div>
    </div>
  );
};

export { Reg };
