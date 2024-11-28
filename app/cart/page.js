import Image from "next/image";
import CartList from "../_components/CartList";
import CartOrderingButton from "../_components/CartOrderButton";
import DeleteCartButton from "../_components/DeleteCartButton";
import LinkButton from "../_components/LinkButton";
import { getCart } from "../_services/cart-api";

export const metadata = {
  title: "Cart",
};

async function Page() {
  const cart = await getCart();

  return (
    <div className="flex flex-col">
      {typeof cart !== "string" ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">Cart</h1>
            <DeleteCartButton id={cart.data.cart._id} />
          </div>
          <h2 className="text-sm text-primary-500 mt-4">
            {cart.data.cart.cartItems.length} Products
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] mt-10 gap-4">
            <CartList items={cart.data.cart.cartItems} />
            <div className="border border-primary-900 h-fit lg:sticky top-4 flex flex-col gap-7 py-4 px-5  max-w-96">
              <div className="flex items-center justify-between text-primary-300">
                <p>Number of products</p>
                <span>{cart.data.cart.cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between text-primary-50 font-bold">
                <p>Total Quantity</p>
                <span>{cart.data.cart.totalQuantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <p>Cart Total Price</p>
                <span>${cart.data.cart.totalPrice}</span>
              </div>
              <CartOrderingButton />
            </div>
          </div>
        </>
      ) : (
        <div className="h-[400px] w-full flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/empty-cart.svg"
            alt="empty-cart"
            width={450}
            height={320}
          />
          <h1 className="text-xl md:text-2xl lg:text-3xl">
            Your cart is empty
          </h1>
          <LinkButton href="/menu">Click To Add Some</LinkButton>
        </div>
      )}
    </div>
  );
}

export default Page;
