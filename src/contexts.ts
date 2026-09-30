import { createContext } from "react";
import type { Pizza, PizzaSize } from "./APIResponseTypes";

export interface CartItem {
  // membuat type untuk dipakai
  pizza: Pizza;
  size: PizzaSize;
  price: string;
}

// context akan mengembalikan dua nilai, sepertihalnya useState
// 1. adalah nilai state
// 2. adalah fungsi void, tipe parameter sesuai state
export const CartContext = createContext<
  [CartItem[], (cart: CartItem[]) => void]
>([[], () => {}]);
