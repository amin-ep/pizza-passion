import axios from "axios";
import { notFound } from "next/navigation";

const BASE_URL = process.env.API_BASE_URL;

export async function getAllPizzas(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/pizza?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return err;
  }
}

export async function getPizza(id) {
  try {
    const response = await axios.get(`${BASE_URL}/pizza/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.data.doc;
  } catch (err) {
    notFound();
  }
}
