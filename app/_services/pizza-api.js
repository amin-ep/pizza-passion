import axios from "axios";
import { notFound } from "next/navigation";

export async function getAllPizzas(page = 1) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/pizza?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      return {
        status: "success",
        data: response.data.data.docs,
      };
    }

    return response;
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}

export async function getPizza(id) {
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/pizza/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data.document;
  } catch (err) {
    notFound();
  }
}
