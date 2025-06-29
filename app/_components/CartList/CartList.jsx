import Image from "next/image";
import CartItemIngredientsText from "../motions/CartItemIngredientsText";
import CartItemName from "../motions/CartItemName";
import CartItemQuantity from "../motions/CartItemQuantity";
import CartListItem from "../motions/CartListItem";
import CartItemActions from "./CartItemActions";

export default function CartList({ cart }) {
  return (
    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
      {cart.cartItems.map((item, idx) => (
        <CartListItem index={idx} key={item.pizza._id}>
          <article className="flex w-full justify-start gap-2 md:gap-4">
            <Image
              src={`http://localhost:8000/static/${item.pizza.imageUrl}`}
              width={96}
              height={96}
              alt={item.pizza.name}
              className="aspect-square w-24 object-cover sm:w-32"
            />
            <div className="py-1">
              <CartItemName index={idx}>{item.pizza.name}</CartItemName>
              <CartItemIngredientsText index={idx}>
                {item.pizza.ingredients.join(", ")}
              </CartItemIngredientsText>
            </div>
          </article>
          <section className="flex h-full justify-between border-t border-primary-800">
            <div className="flex items-center justify-center">
              <CartItemQuantity index={idx}>{item.quantity}</CartItemQuantity>
              <div className="flex h-full items-center gap-2 border-r border-primary-800 px-2 sm:px-4">
                {item.pizza.discount > 0 ? (
                  <>
                    <p className="text-sm text-accent-600 sm:text-base">
                      ${item.pizza.finalPrice}
                    </p>
                    <p className="text-xs line-through sm:text-sm">
                      ${item.pizza.unitPrice}
                    </p>
                  </>
                ) : (
                  <p>${item.finalPrice}</p>
                )}
              </div>
            </div>
            <CartItemActions pizzaId={item.pizza._id} />
          </section>
        </CartListItem>
      ))}
    </ul>
  );
}
