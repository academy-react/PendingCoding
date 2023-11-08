import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

import { useUser } from "../../hooks/use-user";
import { ImageUpload } from "../../components/image-upload";

import { uploadApi } from "../../../libs/uploadApi";

import defaultProfile from "../../assets/my-profile.jpg";

import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";

// convert given date to valid postable format
// new Date([selectedDay?.year, selectedDay?.month, selectedDay?.day].join("/"));

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "نام الزامیست" }),
  birthDate: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "تاریخ تولد معتبر نمی‌باشد",
    }),
  nationalId: z
    .number({
      required_error: "کد ملی الزامیست",
    })
    .int()
    .min(20),
  phoneNumber: z
    .number()
    .min(1, { message: "شماره تلفن الزامیست" })
    .max(11, { message: "شماره تلفن نمیتواند بیشتر از 11 رقم باشد" }),
  image: z.object({}),
});

export const EditProfile = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [year, month, day] = new Date()
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const maximumDate = { day, month, year };

  const { userData: user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      birthDate: new Date(user?.birthDate),
      nationalId: user?.nationalId,
      phoneNumber: user?.phoneNumber,
      image: user?.image || defaultProfile,
    },
  });
  const [url, setUrl] = useState(user?.image || "");

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      let image = "";
      if (url === "") {
        const data = new FormData();
        data.append("file", url ?? "");
        data.append("upload_preset", "kjuq7set");
        await uploadApi
          .post("", data)
          .then((res) => res.data)
          .then((data) => (image = data.url));
      }

      if (url !== "" || image !== "") {
        const newCourse = {
          ...values,
          image: image || url,
          createdAt: new Date(),
        };
        console.log(newCourse);
      }
    } catch (error) {
      console.log("CREATE_COURSE_ERROR]", error);
      toast.error("Something went wrong.");
    }
  };

  const handleRemove = () => {
    setIsLoading(true);
    setTimeout(() => {
      form.setValue("image", {});
      setUrl("");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex items-center justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center gap-y-10 border-2 border-gray-200 dark:border-gray-500 rounded-xl shadow-sm py-5"
      >
        <div className="grid grid-cols-2 w-full">
          <div className="flex flex-col justify-center items-center gap-y-10 mt-5">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="نام خود را وارد کنید"
              className="disabled:cursor-not-allowed outline-none w-1/2 bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-destructive">{form.formState.errors.name}</p>
            )}
            <input
              id="nationalId"
              name="nationalId"
              type="number"
              placeholder="کد ملی خود را وارد کنید"
              className="disabled:cursor-not-allowed outline-none w-1/2 bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
              {...form.register("nationalId")}
            />
            {form.formState.errors.nationalId && (
              <p className="text-destructive">
                {form.formState.errors.nationalId}
              </p>
            )}
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              placeholder="شماره همراه خود را وارد کنید"
              className="disabled:cursor-not-allowed outline-none w-1/2 bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
              {...form.register("phoneNumber")}
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-destructive">
                {form.formState.errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-y-10">
            {isLoading ? (
              <Loader2
                size={40}
                className="text-gray-500 dark:text-gray-300 animate-spin"
              />
            ) : (
              <>
                {url ? (
                  <div className="relative flex flex-col justify-self-center">
                    <X
                      onClick={handleRemove}
                      className="w-6 h-6 text-destructive/80 hover:text-destructive transition cursor-pointer"
                    />
                    <img
                      src={url}
                      alt="Image"
                      className="w-36 h-36 rounded-3xl object-fill aspect-square"
                    />
                  </div>
                ) : (
                  <ImageUpload
                    setIsLoading={setIsLoading}
                    errors={form.formState.errors}
                    setUrl={setUrl}
                  />
                )}
              </>
            )}
            <DatePicker
              value={selectedDay}
              onChange={setSelectedDay}
              inputPlaceholder="روز تولد..."
              maximumDate={maximumDate}
              colorPrimary="#5c55c9"
              inputClassName="disabled:cursor-not-allowed outline-none text-[15px] bg-gray-100 dark:bg-gray-300 text-gray-500 dark:text-gray-800 border-2 rounded-full px-5 py-3 duration-200 border-gray-300 focus:border-gray-400"
              shouldHighlightWeekends
              locale="fa"
            />
          </div>
        </div>
        <button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="bg-primary dark:bg-dark-primary text-gray-100 dark:text-gray-200 hover:bg-primary/70 dark:hover:bg-dark-primary/70 hover:text-white/90 dark:hover:text-gray-200/90 disabled:bg-primary/70 disabled:text-white/90 dark:disabled:bg-dark-primary/70 dark:disabled:text-gray-200/90 disabled:cursor-not-allowed font-thin justify-self-center self-center px-10 py-2 rounded-xl text-lg transition"
        >
          ذخیره
        </button>
      </form>
    </div>
  );
};
