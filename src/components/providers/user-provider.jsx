import { createContext, useContext, useState } from "react"
import { useModal } from "../../hooks/use-modal-store"

const UserContext = createContext(null)

function useUser() {
    return useContext(UserContext)
}

function UserProvider({ children }) {
  const {onClose} = useModal()

    const currentUser = localStorage.getItem("user")

    const [userData, setUserDate] = useState({
        user: currentUser,
        cart: []
    })

    const addToCart = (book) => {
      console.log(book)
        setUserDate({
          ...userData,
          cart: userData.cart.find((cartItem) => cartItem.id === book.id)
            ? userData.cart.map((cartItem) =>
                cartItem.id === book.id
                  ? { ...cartItem, count: cartItem.count + 1 }
                  : cartItem
              )
            : [...userData.cart, { ...book, count: 1 }]
        });
        onClose()
      };
    
      const removeFromCart = (id) =>{
        setUserDate({
          ...userData,
          cart: userData.cart.filter((cartItem) => cartItem.id !== id)
        });
        userData.cart.length === 1 && onClose()
      }
       
    
      const increase = (id) => {
        setUserDate({
          ...userData,
          cart: userData.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        });
      };
    
      const decrease = (id) => {
        setUserDate({
          ...userData,
          cart: userData.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
              : cartItem
          )
        });
      };
    return (
        <UserContext.Provider
        value={{ userData, addToCart, increase, decrease, removeFromCart }}
      >
       {children}
      </UserContext.Provider>
    )
}



export { UserProvider, useUser }