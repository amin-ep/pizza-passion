"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import {
  addPizzaToCart,
  deleteCart,
  getCart,
  removePizzaFromCart,
} from "../_lib/actions";

const initialState = {
  status: "",
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
  cartId: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };

    case "idle":
      return { ...state, status: "idle" };

    case "updating":
      return { ...state, status: "updating" };

    case "deleting":
      return { ...state, status: "deleting" };

    case "cartItems":
      return {
        ...state,
        cartItems: action.payload.items,
        cartId: action.payload.id,
      };

    case "delete":
      return {
        ...state,
        cartItems: [],
        cartTotalPrice: 0,
        cartTotalQuantity: 0,
      };

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
        cartTotalPrice: state.cartTotalPrice - action.payload.removedPrice,
        cartItems: action.payload.cartItems,
      };
    }

    default:
      throw new Error("Unknown action type");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [
    { status, cartItems, cartTotalQuantity, cartTotalPrice, cartId },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      await getCart()
        .then((res) => {
          dispatch({
            type: "loading",
          });
          dispatch({
            type: "totalData",
            payload: {
              totalQuantity: res.data.cart.totalQuantity,
              totalPrice: res.data.cart.totalPrice,
            },
          });
          dispatch({
            type: "cartItems",
            payload: {
              items: res?.data.cart.cartItems,
              id: res.data.cart._id,
            },
          });
        })
        .catch(() => {
          dispatch({
            type: "totalData",
            payload: {
              totalQuantity: 0,
              totalPrice: 0,
            },
          });
        })
        .finally(() => {
          dispatch({
            type: "idle",
          });
        });
    })();
  }, []);

  const handleAddItemToCart = async (pizzaId) => {
    let updatedCartItems = cartItems;
    await addPizzaToCart({ cartItems: [{ pizza: pizzaId }] }).then((res) => {
      const addedPizza = res?.data?.cart?.cartItems.find(
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
        payload: {
          cartItems: updatedCartItems,
          removedPrice: targetItem.pizza.finalPrice,
        },
      });
    });
  };

  const handleDeleteCart = async (id) => {
    try {
      dispatch({
        type: "deleting",
      });
      await deleteCart(id);
      dispatch({
        type: "delete",
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "idle",
      });
    }
  };

  const handleOrderCart = () => {
    dispatch({
      type: "delete",
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
        deleteCartById: handleDeleteCart,
        orderCart: handleOrderCart,
        cartId: cartId,
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
