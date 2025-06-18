import CartList from "@/app/_components/CartList/CartList";
import CartOrderForm from "@/app/_components/CartOrderForm";
import AnimatedHeading from "@/app/_components/motions/AnimatedHeading";

export default async function CartPage() {
  return (
    <>
      <AnimatedHeading>Your Cart</AnimatedHeading>
      <div className="grid grid-cols-1 gap-2 md:gap-4 lg:grid-cols-[1fr_300px]">
        <CartList />
        <CartOrderForm />
      </div>
    </>
  );
}
