import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import type { CartItem } from "../types";

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: CartItem) => void;

  removeItem: (
    id: number,
    color: string,
    size: string
  ) => void;

  updateQuantity: (
    id: number,
    color: string,
    size: string,
    quantity: number
  ) => void;
}

const CartContext =
  createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] =
    useLocalStorage<CartItem[]>(
      "cart",
      []
    );

  const addToCart = (
    item: CartItem
  ) => {
    const existingItem =
      cart.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity +
                  item.quantity,
              }
            : cartItem
        )
      );

      return;
    }

    setCart([...cart, item]);
  };

  const removeItem = (
    id: number,
    color: string,
    size: string
  ) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  const updateQuantity = (
    id: number,
    color: string,
    size: string,
    quantity: number
  ) => {
    setCart(
      cart.map((item) =>
        item.id === id &&
        item.color === color &&
        item.size === size
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};