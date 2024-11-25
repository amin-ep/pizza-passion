"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { addPizzaToCart, getCart, removePizzaFromCart } from "../_lib/actions";

const initialState = {
  status: "idle",
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };

    case "idle":
      return { ...state, status: "idle" };

    case "updating":
      return { ...state, status: "updating" };

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

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: "loading",
        });
        const cart = await getCart();
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
      } catch (err) {
        dispatch({
          type: "totalData",
          payload: 0,
        });
      } finally {
        dispatch({
          type: "idle",
        });
      }
    })();
  }, []);

  const handleAddItemToCart = async (pizzaId) => {
    try {
      dispatch({
        type: "updating",
      });
      let updatedCartItems = cartItems;
      const result = await addPizzaToCart({ cartItems: [{ pizza: pizzaId }] });
      const addedPizza = result?.data?.cart?.cartItems.find(
        (el) => el.pizza._id === pizzaId
      );
      const addedPizzaIndex = updatedCartItems.findIndex(
        (el) => el._id === addedPizza?._id
      );

      if (addedPizzaIndex === -1) {
        updatedCartItems = [...updatedCartItems, addedPizza];
      } else {
        updatedCartItems[addedPizzaIndex].quantity += 1;
      }
      dispatch({
        type: "add",
        payload: {
          cartItems: updatedCartItems,
          addedItemPrice: addedPizza?.pizza?.finalPrice,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "idle",
      });
    }
  };

  const handleRemovePizza = async (pizzaId) => {
    try {
      dispatch({
        type: "updating",
      });
      await removePizzaFromCart(pizzaId);
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
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "idle",
      });
    }
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

export { CartProvider, useCart };
