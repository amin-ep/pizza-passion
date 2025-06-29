import axios from "axios";
import { cookies } from "next/headers";

export async function getAllOrders() {
  try {
    const token = cookies().get(process.env.JWT_SECRET)?.value;

    const res = await axios.get(`${process.env.API_BASE_URL}/order/myOrders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      return res.data.data.orders;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getOrderById(id) {
  const token = cookies().get(process.env.JWT_SECRET)?.value;

  const res = await axios.get(`${process.env.API_BASE_URL}/order/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
