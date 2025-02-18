import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ProductType } from "../type";

interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: "ADD_TO_CART"; payload: ProductType }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (existingIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return { cart: updatedCart };
      }
      return {
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case "CLEAR_CART":
      return { cart: [] };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
