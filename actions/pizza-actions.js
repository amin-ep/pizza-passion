"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function ratePizzaById(pizzaId, rateNumber) {
  try {
    const authToken = await cookies().get(process.env.JWT_SECRET).value;

    const response = await axios.post(
      `${process.env.API_BASE_URL}/rating`,
      { pizza: pizzaId, rate: rateNumber },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    if (response.status === 201) {
      revalidatePath(`/menu/${pizzaId}`);
      return {
        status: "success",
        message: "Rated successfully",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data.message || "Server error!",
      errors: {},
    };
  }
}
