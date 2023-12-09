import { createContext, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";
import {
  // reserveCourse,
  deleteReservedCourse,
} from "../../core/services/api/user";
import {
  // addCourseToFavorites,
  deleteCourseFavorite,
} from "../../core/services/api/get-courses";
// import { addBlogToFavorite } from "../../core/services/api/get-blogs";
import { setItem } from "../../core/services/common/storage.services";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const { onClose } = useModal();

  const userInfo = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const [userData, setUserData] = useState(
    userInfo || {
      user: null,
      cart: [],
      favoriteCourse: [],
      favoriteBlog: [],
      myCourses: [],
    }
  );

  // const addToCart = async (course) => {
  //   try {
  //     await reserveCourse(course?.courseId);
  //     onClose();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
  //   }
  // };

  const removeFromCart = async (courseId, reserveId) => {
    try {
      await deleteReservedCourse(reserveId).then(() => {
        const newObj = {
          ...userData,
          cart: userData.cart.filter((c) => c.courseId !== courseId),
        };
        setUserData(newObj);
        userData.cart.length === 1 && onClose();
        setItem("user", newObj);
        toast.success("دوره با موفقیت حذف شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    } finally {
      onClose();
    }
  };

  const checkout = (course) => {
    const newObj = {
      ...userData,
      cart: userData.cart.filter((c) => c.id !== course.id),
      myCourses: userData.myCourses.find((mc) => mc.id === course.id)
        ? [...userData.myCourses]
        : [...userData.myCourses, { ...course }],
    };
    setUserData(newObj);
    localStorage.setItem("user", JSON.stringify(newObj));
  };

  // const increase = (id) => {
  //   const newObj = {
  //     ...userData,
  //     cart: userData.cart.map((cartItem) =>
  //       cartItem.id === id
  //         ? { ...cartItem, count: cartItem.count + 1 }
  //         : cartItem
  //     ),
  //   };
  //   setUserData(newObj);
  //   localStorage.setItem("user", JSON.stringify(newObj));
  // };

  // const decrease = (id) => {
  //   const newObj = {
  //     ...userData,
  //     cart: userData.cart.map((cartItem) =>
  //       cartItem.id === id
  //         ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
  //         : cartItem
  //     ),
  //   };
  //   setUserData(newObj);
  //   localStorage.setItem("user", JSON.stringify(newObj));
  // };

  // const removeFromFavorites = async (id, user_favorite_id) => {
  //   try {
  //     await deleteCourseFavorite(user_favorite_id).then((res) => {
  //       if (res.success) {
  //         const newObj = {
  //           ...userData,
  //           favoriteCourse: userInfo?.favoriteCourse.filter(
  //             (f) => f.courseId !== id
  //           ),
  //         };
  //         setUserData(newObj);
  //         setItem("user", newObj);
  //         toast.success("از لیست علاقه مندی ها حذف شد");
  //       } else toast.error(res.message);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
