import { addToCart, removeFromCart } from "@/actions/cart-actions";
import Image from "next/image";
import CartItemButton from "./CartItemButton";

export default function CartItemActions({ pizzaId }) {
  return (
    <div className="grid grid-cols-[repeat(2,2rem)] border-l border-primary-800 sm:grid-cols-[repeat(2,2.5rem)]">
      <form className="h-full w-full p-0" action={removeFromCart}>
        <input type="hidden" name="pizzaId" value={pizzaId} />
        <CartItemButton>
          <Image
            src="/icons/minus-icon-primary.svg"
            alt="increase"
            width={32}
            height={32}
          />
        </CartItemButton>
      </form>
      <form className="h-full w-full p-0" action={addToCart}>
        <input type="hidden" name="pizza" value={pizzaId} />
        <CartItemButton>
          <Image
            src="/icons/plus-icon-primary.svg"
            alt="increase"
            width={32}
            height={32}
          />
        </CartItemButton>
      </form>
    </div>
  );
}
