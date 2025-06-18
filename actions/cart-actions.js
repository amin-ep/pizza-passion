"use server";

import { getMe } from "@/app/_services/user-api";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addToCart(formData) {
  try {
    const token = await cookies().get(process.env.JWT_SECRET).value;

    if (!token) {
      redirect("/access/login");
    } else {
      const user = await getMe();
      const pizza = formData.get("pizza");

      const res = await axios.post(
        `${process.env.API_BASE_URL}/cart`,
        { customer: user._id, pizza: pizza },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res?.status === 201) {
        revalidateTag("cart");
      }
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Server error!",
    };
  }
}

export async function removeFromCart(formData) {
  try {
    const token = await cookies().get(process.env.JWT_SECRET)?.value;

    if (!token) {
      redirect("/access/login");
    } else {
      const pizzaId = formData.get("pizzaId");
      const user = await getMe();
      const res = await axios({
        method: "DELETE",
        data: { customer: user._id },
        baseURL: process.env.API_BASE_URL,
        url: `/cart/deleteItem/${pizzaId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 204) {
        revalidateTag("cart");
        return {
          status: "success",
          message: "removed successfully successfully",
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
