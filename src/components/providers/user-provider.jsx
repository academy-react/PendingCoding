import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

import { useModal } from "../../hooks/use-modal-store";

const UserContext = createContext(null);

function useUser() {
  return useContext(UserContext);
}

function UserProvider({ children }) {
  const { onClose } = useModal();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState({
    user: userInfo.user || "",
    cart: userInfo.cart || [],
    favorites: userInfo.favorites || [],
    myCourses: userInfo.myCourses || [],
  });

  const addToCart = (course) => {
    const newObj = {
      ...userData,
      cart: userData.cart.find((cartItem) => cartItem.id === course.id)
        ? [...userData.cart]
        : [...userData.cart, { ...course }],
    };
    setUserData(newObj);
    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("دوره به سبدتون اضافه شد");
    onClose();
  };

  const removeFromCart = (id) => {
    const newObj = {
      ...userData,
      cart: userData.cart.filter((cartItem) => cartItem.id !== id),
    };
    setUserData(newObj);
    userData.cart.length === 1 && onClose();
    localStorage.setItem("user", JSON.stringify(newObj));
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

  const addToFavorites = (course) => {
    const newObj = {
      ...userData,
      favorites: [...userInfo.favorites, { ...course }],
    };
    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("به علاقه مندی اضافه شد");
  };

  const removeFromFavorites = (course) => {
    const favorites = userInfo?.favorites.filter((f) => f.id !== course.id);

    const newObj = {
      ...userData,
      favorites,
    };
    localStorage.setItem("user", JSON.stringify(newObj));
    toast.success("از لیست علاقه مندی ها حذف شد");
  };

  return (
    <UserContext.Provider
      value={{
        userData,
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

export { UserProvider, useUser };
