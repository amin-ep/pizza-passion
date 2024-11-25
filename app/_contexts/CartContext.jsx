"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useTransition,
} from "react";
import { addPizzaToCart, getCart, removePizzaFromCart } from "../_lib/actions";

const initialState = {
  status: "idle",
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "status":
      return { ...state, status: "loading" };

    case "idle":
      return { ...state, status: "idle" };

    case "cartItems":
      return { ...state, cartItems: action.payload };

    case "add":
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartTotalQuantity: state.cartTotalQuantity + 1,
        cartTotalPrice: state.cartTotalPrice + action.payload.addedItemPrice,
      };

    case "totalData":
      return {
        ...state,
        cartTotalQuantity: action.payload.totalQuantity,
        cartTotalPrice: action.payload.totalPrice,
      };

    case "remove": {
      return {
        ...state,
        cartTotalQuantity: state.cartTotalQuantity - 1,
        cartItems: action.payload,
      };
    }

    default:
      throw new Error("Unknown action type");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [{ status, cartItems, cartTotalQuantity, cartTotalPrice }, dispatch] =
    useReducer(reducer, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      const cart = await getCart();
      if (typeof cart === "string") {
        dispatch({
          type: "totalData",
          payload: 0,
        });
      } else {
        dispatch({
          type: "totalData",
          payload: {
            totalQuantity: cart.data.cart.totalQuantity,
            totalPrice: cart.data.cart.totalPrice,
          },
        });
        dispatch({
          type: "cartItems",
          payload: cart?.data.cart.cartItems,
        });
      }
    })();
  }, []);

  const handleAddItemToCart = async (pizzaId) => {
    let updatedCartItems = cartItems;
    const result = await addPizzaToCart({ cartItems: [{ pizza: pizzaId }] });
    const addedPizza = result.data.cart.cartItems.find(
      (el) => el.pizza._id === pizzaId
    );
    const addedPizzaIndex = updatedCartItems.findIndex(
      (el) => el._id === addedPizza._id
    );
    console.log(addedPizza);
    if (addedPizzaIndex === -1) {
      updatedCartItems = [...updatedCartItems, addedPizza];
    } else {
      updatedCartItems[addedPizzaIndex].quantity += 1;
    }
    dispatch({
      type: "add",
      payload: {
        cartItems: updatedCartItems,
        addedItemPrice: addedPizza.pizza.finalPrice,
      },
    });
  };

  const handleRemovePizza = async (pizzaId) => {
    await removePizzaFromCart(pizzaId).then(() => {
      let updatedCartItems = cartItems;
      const itemIndex = updatedCartItems.findIndex(
        (el) => el.pizza._id === pizzaId
      );
      const targetItem = updatedCartItems[itemIndex];
      if (targetItem.quantity > 1) {
        updatedCartItems[itemIndex].quantity -= 1;
      } else {
        updatedCartItems = updatedCartItems.filter(
          (el) => el.pizza._id !== pizzaId
        );
      }

      dispatch({
        type: "remove",
        payload: updatedCartItems,
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        status,
        cartItems,
        cartTotalQuantity,
        cartTotalPrice,
        addToCart: handleAddItemToCart,
        removeFromCart: handleRemovePizza,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("Context was used outside provider");
  }

  return context;
};

export { useCart, CartProvider };
