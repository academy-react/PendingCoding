import { createContext, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";
import {
  reserveCourse,
  deleteReservedCourse,
} from "../../core/services/api/user";
import {
  addCourseToFavorites,
  deleteCourseFavorite,
} from "../../core/services/api/get-courses";
import { addBlogToFavorite } from "../../core/services/api/get-blogs";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const { onClose } = useModal();

  const userInfo = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const [userData, setUserData] = useState(
    userInfo || {
      user: null,
      cart: [],
      favorites: [],
      myCourses: [],
    }
  );

  const addToCart = async (course) => {
    try {
      await reserveCourse(course?.courseId).then(() => {
        const newObj = {
          ...userData,
          cart: userData.cart.find((c) => c.courseId === course?.courseId)
            ? [...userData.cart]
            : [...userData.cart, { ...course }],
        };
        setUserData(newObj);
        localStorage.setItem("user", JSON.stringify(newObj));
        toast.success("دوره به سبدتون اضافه شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    } finally {
      onClose();
    }
  };

  const removeFromCart = async (courseId, reserveId) => {
    try {
      await deleteReservedCourse(reserveId).then(() => {
        const newObj = {
          ...userData,
          cart: userData.cart.filter((c) => c.courseId !== courseId),
        };
        setUserData(newObj);
        userData.cart.length === 1 && onClose();
        localStorage.setItem("user", JSON.stringify(newObj));
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

  const addToFavorites = async (id, isBlog) => {
    try {
      if (isBlog) await addBlogToFavorite(id);
      else await addCourseToFavorites(id);

      const newObj = {
        ...userData,
        favorites: [...userInfo.favorites, { id }],
      };
      setUserData(newObj);
      localStorage.setItem("user", JSON.stringify(newObj));
      toast.success("به علاقه مندی اضافه شد");
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  const removeFromFavorites = async (id, user_favorite_id) => {
    try {
      await deleteCourseFavorite(user_favorite_id);
      const newObj = {
        ...userData,
        favorites: userInfo?.favorites.filter((f) => f.id !== id),
      };
      setUserData(newObj);
      localStorage.setItem("user", JSON.stringify(newObj));
      toast.success("از لیست علاقه مندی ها حذف شد");
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        addToCart,
        removeFromCart,
        checkout,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
