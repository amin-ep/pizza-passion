import axios from "axios";

export async function signup(payload) {
  const response = await axios.post(
    `${process.env.API_BASE_URL}/auth/signup`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

export async function login(payload) {
  const response = await axios.post(
    `${process.env.API_BASE_URL}/auth/login`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}
