import { Link } from "react-router-dom";

const Log = () => {
  return (
    <div
     className="w-[700px] h-[700px] rounded-[100%] bg-[#505050] flex justify-start   items-center text-[#fff] text-center float-right mt-[-700px] 
     
     max-[1110px]:mt-[-200px] max-[1110px]:justify-center
     max-[700px]:w-[500px] max-[700px]:h-[500px] max-[700px]:mt-[-150px]"
    >

      <div className="w-[380px] mr-[30px] flex flex-col flex-wrap gap-[15px] items-center max-[1110px]:m-[100px_0_0_0]">
        <h1 className="text-[24px]"> قبلا ثبت نام کرده اید؟</h1>
        <p className="text-[14px]">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با استفاده از طراحان گرافیک است</p>
        <p className="text-[14px] w-[310px]"> لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و .با استفاده از طراحان گرافیک است </p>

        <button
         className="text-[#505050] bg-[#EEEEEE] cursor-pointer rounded-[50px] text-[18px] p-[10px_0] w-[300px] m-[20px_0] hover:bg-[#DDDDDD]
         
         max-[700px]:p-[7px_0] max-[700px]:w-[270px]  overflow-hidden relative"
        > ورود 
        <Link to="/sign-in" className="w-full h-full absolute cursor-pointer top-0 left-0"></Link>
        </button>
      </div>
    </div>
  )
}

export {Log}