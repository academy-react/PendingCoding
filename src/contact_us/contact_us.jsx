import location from '../assets/location.svg'
import { Banner } from '../components/banner'
import { ContactItems } from './contact_items'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import loc from '../assets/contact_us_items/loc.svg'
import phone from '../assets/contact_us_items/phone.svg'
import email from '../assets/contact_us_items/email.svg'
import instagram from '../assets/contact_us_items/instagram.svg'
import telegram from '../assets/contact_us_items/telegram.svg'
import face from '../assets/contact_us_items/face.svg'
import x from '../assets/contact_us_items/x.svg'

import member from '../assets/contact_us_items/member.svg'
import { getPersianNumbers } from '../../libs/get-persian-numbers';


const formSchema = z.object({
  email: z
    .string()
    .email({ message: "ایمیل نامعتبر" })
    .min(1, { message: "ایمیل خود را وارد کنید" }),
  message: z.string().min(1, { message: "پیام خود را وارد کنید" }),
});

const ContactUs = () => {

  const form = useForm({
    defaultValues: {
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };

  return ( 
    <div className="w-[clamp(100px,100%,1536px)] m-[0_auto] flex flex-col p-[0_50px_150px] pt-20">

      <Banner title="ارتباط با ما" />

      <div className="flex m-[80px_0]
      
      max-[1500px]:flex-col max-[1500px]:items-center max-[1500px]:gap-[60px]">

        <div className="w-[clamp(100px,100%,550px)] h-[426px]">

          <div className="h-[44px] flex mb-[80px]
          
          max-[1500px]:justify-center max-[1500px]:pl-[60px]">
            <img src={loc} />
            <div className="flex flex-col m-[0_10px_0_0]">
              <p className="text-[#505050] text-[15px]"> آدرس پزوهشگاه : </p>
              <p className="text-[#A4A4A4] text-[14px]">میدان خزر،نرسیده به دانشگاه روزبهان،جنب دنیای آرزو</p>
            </div>
          </div>

          <div className="flex flex-row
          
          max-[1500px]:justify-center">
            <div className="w-[clamp(50px,100%,285px)]">
              <ContactItems src={phone} title="شماره تلفن :" desc={`${getPersianNumbers(989117828923 , true)}+`} />
              <ContactItems src={instagram} title="اینستاگرام :" desc="__arman__rv" />
              <ContactItems src={face} title="فیس بوک :" desc="نتیجه ای یافت نشد!" />
            </div>
            <div className="w-[clamp(50px,100%,255px)]"> 
              <ContactItems src={email} title="پست الکترونیکی :" desc="pendingcoding@gmail.com" />
              <ContactItems src={telegram} title="تلگرام :" desc="arman_rv@" />
              <ContactItems src={x} title="توییتر" desc="نتیجه ای یافت نشد!" />
            </div>
          </div>

        </div>

        <div className="w-[clamp(100px,100%,961px)]">
          <img src={location} className="w-full" />
        </div>

      </div>


      <div className="flex gap-[150px]
      
      max-[1100px]:gap-[10px]
      max-[960px]:flex-col max-[960px]:gap-[30px] max-[960px]:items-center max-[960px]:px-[50px]">

        <div className="w-[clamp(100px,90%,704px)] flex flex-col
        
        max-[960px]:w-[100%]">

          <Banner title="با ما در تماس باشید "/>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-start gap-y-2 mt-[45px]
            
            max-[960px]:w-full max-[960px]:items-center"
          >
            <input
              className="disabled:cursor-not-allowed outline-none w-[clamp(100px,90%,704px)] bg-[#EEEEEE] text-gray-500 dark:text-gray-800 border-2 rounded-full px-6 pl-12 py-4 duration-200 border-gray-300 focus:border-gray-400 mb-[15px]"
              placeholder="پست الکترونیکی"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-rose-600/90 mr-5 text-base">
                {form.formState.errors.email.message}
              </p>
            )}
            <textarea
              className="resize-none h-40 disabled:cursor-not-allowed outline-none w-[clamp(100px,90%,704px)] bg-[#EEEEEE] text-gray-500 dark:text-gray-800 border-2 rounded-[25px] px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
              placeholder="متن پیام"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-rose-600/90 mr-5 text-base">
                {form.formState.errors.message.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-white hover:text-white/80 bg-primary hover:bg-primary/80 disabled:bg-primary/80 disabled:text-white/80 py-2 text-lg w-2/4 my-4 rounded-full transition"
            >
              ارسال پیام
            </button>
          </form>

        </div>

        <div className="flex flex-col gap-[45px]
        
        max-[960px]:w-[100%]">
          <Banner title="مخاطب شما " />

          <div className="flex flex-col gap-[80px]">
            
            <div className="flex gap-[20px]">
              <img src={member} />
              <div className="flex flex-col gap-[10px]">
                <p className="text-[18px] text-[#505050]">آرمان رضوانی</p>
                <p className="text-[14px] text-[#A4A4A4]"> کارشناس پشتیبانی فنی </p>
                <p className="text-[14px] text-[#A4A4A4]"> شماره موبایل: 90203693966 </p>
                <p className="text-[14px] text-[#A4A4A4]"> پست الکترونیکی :   pendingcoding@gmail.com </p>
              </div>
            </div>

            <div className="flex gap-[20px]">
              <img src={member} />
              <div className="flex flex-col gap-[10px]">
                <p className="text-[18px] text-[#505050]"> امیر عباس بابایی </p>
                <p className="text-[14px] text-[#A4A4A4]"> کارشناس پشتیبانی فنی </p>
                <p className="text-[14px] text-[#A4A4A4]"> شماره موبایل: 90203693966 </p>
                <p className="text-[14px] text-[#A4A4A4]"> پست الکترونیکی :   pendingcoding@gmail.com </p>
              </div>
            </div>

          </div>     

        </div> 

      </div>

    </div>
  )
}

export { ContactUs }