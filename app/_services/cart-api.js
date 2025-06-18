import { cookies } from "next/headers";
import axios from "axios";

export async function getCart() {
  try {
    const token = cookies().get(process.env.JWT_SECRET)?.value;

    if (!token) {
      throw new Error("You must be logged in");
    }

    const res = await fetch(`${process.env.API_BASE_URL}/cart/myCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: "cart",
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      return data.data.cart;
    }
  } catch (err) {
    console.log("error: ", err);
    // return err?.message || "Something went wrong!";
  }
}
