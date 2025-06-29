import CartList from "@/app/_components/CartList/CartList";
import CartOrderForm from "@/app/_components/CartOrderForm";
import AnimatedHeading from "@/app/_components/motions/AnimatedHeading";
import { getCart } from "@/app/_services/cart-api";
import { getMe } from "@/app/_services/user-api";
import { Suspense } from "react";

async function Items() {
  const cart = await getCart();
  const user = await getMe();

  if (cart && cart?.cartItems.length > 0)
    return (
      <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-[1fr_300px]">
        <CartList cart={cart} />
        <CartOrderForm user={user} />
      </div>
    );
  else
    return (
      <div>
        <h2 className="text-center text-lg text-accent-600 sm:text-xl md:text-2xl">
          Your cart is empty!
        </h2>
      </div>
    );
}

export default async function CartPage() {
  return (
    <>
      <AnimatedHeading>Your Cart</AnimatedHeading>
      <Suspense fallback={<p>Loading...</p>}>
        <Items />
      </Suspense>
    </>
  );
}
