import { addToCart } from "@/actions/cart-actions";
import AddToCartButton from "@/app/_components/AddToCartButton";
import AnimatedHeading from "@/app/_components/motions/AnimatedHeading";
import PizzaImageContainer from "@/app/_components/motions/PizzaImageContainer";
import PizzaIngredientsContainer from "@/app/_components/motions/PizzaIngredientsContainer";
import PizzaPriceContainer from "@/app/_components/motions/PizzaPriceContainer";
import RatingsAverageContainer from "@/app/_components/motions/RatingsAverageContainer";
import QuantitySelector from "@/app/_components/QuantitySelector/QuantitySelector";
import StarRating from "@/app/_components/StarRating";
import { getCart } from "@/app/_services/cart-api";
import { getAllPizzas, getPizza } from "@/app/_services/pizza-api";
import { getMe } from "@/app/_services/user-api";
import { cookies } from "next/headers";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { name } = await getPizza(params.pizzaId);
  return { title: name };
}

export async function generateStaticParams() {
  const pizzas = await getAllPizzas();

  if (pizzas.status === "success") {
    const ids = pizzas.data.map((pizza) => ({ pizzaId: pizza._id }));
    return ids;
  } else {
    return "not found!";
  }
}

async function Page({ params }) {
  const { pizzaId } = params;
  const pizza = await getPizza(pizzaId);
  const currentUser = await getMe();
  const userId = (currentUser && currentUser._id) || null;

  const authTokenObj = await cookies().get(process.env.JWT_SECRET);

  let cart;
  let isInCart = false;
  let quantity;

  if (authTokenObj) {
    cart = await getCart();
    if (cart) {
      isInCart = cart.cartItems.some((el) => el.pizza._id === pizzaId);

      if (isInCart) {
        quantity = cart.cartItems.find(
          (el) => el.pizza._id === pizzaId,
        ).quantity;
      }
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 xsm:grid-cols-2 md:grid-cols-[344px_1fr]">
      <PizzaImageContainer>
        <Image
          src={`http://localhost:8000/static/${pizza.imageUrl}`}
          alt={pizza.name}
          width={320}
          height={320}
          className="aspect-square w-full rounded-sm object-cover"
        />
        <StarRating
          pizzaId={pizzaId}
          ratings={pizza.ratings}
          maxRating={5}
          currentUserId={userId}
          isLoggedIn={authTokenObj ? true : false}
        />
      </PizzaImageContainer>
      <div className="text-center">
        <AnimatedHeading>{pizza.name}</AnimatedHeading>

        <RatingsAverageContainer>
          {pizza.ratingsAverage ? (
            <div className="relative flex items-center justify-center">
              <Image
                src="/icons/star-icon-accent.svg"
                alt="star"
                width={25}
                height={25}
                className="w-10 sm:w-11 md:w-14 xl:w-16"
              />
              <p className="absolute top-3 text-sm font-semibold text-accent-500 sm:top-3.5 md:top-5 md:text-base xl:top-[22px] xl:text-lg">
                {pizza.ratingsAverage}
              </p>
            </div>
          ) : (
            <p className="text-xs italic text-primary-300 xsm:text-sm sm:text-base md:text-lg">
              Not rated yet!
            </p>
          )}
        </RatingsAverageContainer>
        <PizzaPriceContainer className="flex flex-row items-center justify-center gap-2">
          {pizza.discount > 0 ? (
            <>
              <p className="text-base text-accent-600 sm:text-lg md:text-xl">
                ${pizza.finalPrice}
              </p>
              <p className="text-sm text-primary-400 line-through sm:text-base md:text-lg">
                ${pizza.unitPrice}
              </p>{" "}
            </>
          ) : (
            <p className="text-base text-accent-600 sm:text-lg md:text-xl">
              ${pizza.finalPrice}
            </p>
          )}
        </PizzaPriceContainer>
        <PizzaIngredientsContainer>
          <h2 className="text-lg text-accent-400 sm:text-xl md:text-2xl lg:text-3xl">
            Ingredients
          </h2>
          <p className="text-base sm:text-xl">{pizza.ingredients.join(", ")}</p>
        </PizzaIngredientsContainer>
        {isInCart ? (
          <QuantitySelector pizzaId={pizzaId} quantity={quantity} />
        ) : (
          <form action={addToCart}>
            <input type="hidden" name="pizza" value={pizzaId} />
            <AddToCartButton />
          </form>
        )}
      </div>
    </div>
  );
}

export default Page;
