import { addToCart, removeFromCart } from "@/actions/cart-actions";
import Image from "next/image";
import Button from "./Button";

async function QuantitySelector({ quantity, pizzaId }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <form action={removeFromCart}>
        <input type="hidden" name="pizzaId" value={pizzaId} />
        <Button>
          <Image
            src="/icons/minus-icon-primary.svg"
            alt="decrease"
            width={20}
            height={20}
            className="z-10 w-full"
          />
        </Button>
      </form>
      <span className="flex h-10 w-10 items-center justify-center border border-primary-800">
        {quantity}
      </span>
      <form action={addToCart}>
        <input type="hidden" name="pizza" value={pizzaId} />
        <Button>
          <Image
            src="/icons/plus-icon-primary.svg"
            alt="increase"
            width={20}
            height={20}
            className="z-10 w-full"
          />
        </Button>
      </form>
    </div>
  );
}

export default QuantitySelector;
