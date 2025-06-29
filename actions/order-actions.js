"use server";

import { getCart } from "@/app/_services/cart-api";
import { getMe } from "@/app/_services/user-api";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function orderPizza(payload) {
  try {
    const data = { ...payload };
    const user = await getMe();
    const cart = await getCart();

    if (user) {
      data.customer = user._id;
    }
    if (cart) {
      data.cart = cart._id;
    }
    const token = await cookies().get(process.env.JWT_SECRET)?.value;
    if (!token) {
      return {
        status: "error",
        message: "you're not logged in",
      };
    }
    const response = await axios.post(
      `${process.env.API_BASE_URL}/order`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 201) {
      return {
        status: "success",
        message: "Your cart ordered successfully",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Server error!",
    };
  }
}

export async function cancelOrder(orderId) {
  try {
    const payload = { status: "cancelled" };
    const token = cookies().get(process.env.JWT_SECRET)?.value;
    if (!token) {
      return {
        status: "error",
        message: "you're not logged in",
      };
    } else {
      const res = await axios.patch(
        `${process.env.API_BASE_URL}/order/${orderId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        revalidatePath("/account/orders");
        return {
          status: "success",
          message: "Order cancelled",
        };
      }
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Server error!",
    };
  }
}

export async function setOrderReceived(orderId) {
  try {
    const payload = { status: "received" };
    const token = cookies().get(process.env.JWT_SECRET)?.value;
    if (!token) {
      return {
        status: "error",
        message: "you're not logged in",
      };
    } else {
      const res = await axios.patch(
        `${process.env.API_BASE_URL}/order/${orderId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        revalidatePath("/account/orders");
        return {
          status: "success",
          message: "Order cancelled",
        };
      }
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Server error!",
    };
  }
}
