"use server";

import { cookies } from "next/headers";

export async function getMe() {
  try {
    const token = await cookies().get(process.env.JWT_SECRET)?.value;
    if (!token) return;
    const response = await fetch(`${process.env.API_BASE_URL}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: "me",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.data.document;
    }
  } catch (err) {
    console.log(err);
  }
}
