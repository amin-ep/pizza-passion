import axios from "axios";

export async function getUserByEmail({ email }) {
  const response = await axios.get(
    `${process.env.API_BASE_URL}/user/email/${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}
