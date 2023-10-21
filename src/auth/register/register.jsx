import {useForm} from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

import { Link } from "react-router-dom";


const formSchema = z.object({
    email : z
        .string()
        .email({ message: "ایمیل نامعتبر" })
        .min(1 , {message: "ایمیل خود را وارد کنید"}),
    password : z
        .string()
        .min(4 , {message: "رمز عبور حداقل 4 کاراکتر دارد"})
        .max(15 , {message: "رمز عبور حداکثر 15 کاراکتر دارد"}),
    confirmPassword : z
        .string()
        .min(4 , {message: "رمز عبور حداقل 4 کاراکتر دارد"})
        .max(15 ,{message: "رمز عبور حداکثر 15 کاراکتر دارد"} )
})
.refine((data) => data.password === data.confirmPassword, {
    message: "باید با رمز عبور یکسان باشد",
    path: ["confirmPassword"], 
});

const Register = () => {


    const {register , handleSubmit , formState:{errors}} = useForm({
        resolver : zodResolver(formSchema)
    })

    const onSubmit = (values) => {
        console.log("form updated...!!!" , values);
    }

    return (
      <div className="bg-[#EEEEEE] w-[700px] h-[700px] rounded-[100%] border-[15px] border-solid border-[#505050] flex justify-center items-center float-left relative">
        <div className="w-[350px] h-[460px] flex justify-center items-center flex-col flex-nowrap ">
            <h1 className="text-[#505050] text-[28px] mb-[40px]"> ثبت نام حساب کاربری </h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                 type="text"
                 placeholder="پست الکترونیکی"
                 className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]"
                 {...register("email")}  
                />
                {errors.email && (
                    <div
                    className="relative bottom-[25px] text-[#ff1f1f] right-[10px]"
                    >
                        {errors.email?.message}
                    </div>
                )}

                <input
                 type="password"
                 placeholder="رمز عبور"
                 className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]"
                 {...register("password")}  
                />
                {errors.password && (
                    <div
                    className="relative bottom-[25px] text-[#ff1f1f] right-[10px]"
                    >
                        {errors.password?.message}
                    </div>
                )}

                <input
                 type="password"
                 placeholder="تکرار رمز عبور"
                 className="focus:outline-none focus:border-[1px] focus:border-solid focus:border-[#989898]  block pr-[14px] bg-transparent w-[344px] h-[55px] border-[1px] border-solid border-[#C8C8C8] text-[#666] rounded-[50px] text-[20px] mb-[30px]"
                 {...register("confirmPassword")}  
                />
                {errors.confirmPassword && (
                    <div
                    className="relative bottom-[25px] text-[#ff1f1f] right-[10px]"
                    >
                        {errors.confirmPassword?.message}
                    </div>
                )}

                    <div className="flex gap-[10px] m-[0_0_20px] items-center">
                        <input
                         type="checkbox" 
                         name="term" 
                         id="term" 
                         className="absolute invisible peer" 
                        />
    
                        <label
                         htmlFor="term" 
                         className="w-[24px] h-[24px] bg-white shadow-[0_1px_10px_rgba(0,0,0,0.25)] rounded-[7px] peer-checked:shadow-[0_1px_10px_rgba(92,85,201,0.25)] peer-checked:bg-[url('../../public/img/check.svg')] bg-no-repeat bg-[length:75%] bg-[50%] cursor-pointer"
                        > </label>
    
                        <label
                         htmlFor="term" 
                         className="text-[12px] text-[#969696] cursor-pointer"
                        > با <Link className="text-[#02B2B8]">قوانین و مقررات </Link>درج شده در آکادمی موافقم. </label>
    
                    </div>
                
                <button
                 className="bg-[#505050] cursor-pointer rounded-[50px] text-[18px] text-white w-[344px] p-[10px_0]"
                 type="submit"
                > مرحله بعد </button>

            </form>
          
        </div>
      </div>
    )
  }
  
  export { Register }