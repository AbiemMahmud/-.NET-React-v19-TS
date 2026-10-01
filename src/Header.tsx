import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext); // tipe sudah inference dari CartContext
  return (
    <nav className="w-full grid grid-cols-5 border-b border-border ">
      <Link
        to={"/"}
        className="col-start-2 col-span-3 flex items-center justify-center"
      >
        <h1 className="text-[2em] logo w-full h-27.5 bg-left bg-no-repeat pb-5 pt-5 ">
          Padre Gino's Pizza
        </h1>
      </Link>
      <div className="flex items-center justify-center text-[40px]">
        🛒
        <span
          data-testid="cart-number"
          className="bg-secondary text-white flex items-center justify-center relative -top-4.25 -left-4.25 w-5 h-5 text-[18px] rounded-full"
        >
          {cart.length}
        </span>
      </div>
    </nav>
  );
}
