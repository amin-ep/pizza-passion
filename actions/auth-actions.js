"use server";

import {
  FORGET_EMAIL_EXPIRES,
  JWT_EXPIRES,
  SIGN_UP_EMAIL_EXPIRES,
} from "@/app/_utils/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(payload) {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/auth/signup`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response?.status === 201) {
      await cookies().set({
        name: process.env.SIGN_UP_EMAIL,
        value: response.data.email,
        expires: SIGN_UP_EMAIL_EXPIRES,
        httpOnly: true,
      });
      return {
        status: "success",
        message: `An email sent to ${response.data.email}`,
        errors: {},
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response.data.message || "Server error!",
      errors: {},
    };
  }
}

export async function verifyEmail(payload) {
  try {
    const res = await axios({
      method: "POST",
      baseURL: process.env.API_BASE_URL,
      url: "/auth/verify",
      data: payload,
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      cookies().set({
        name: process.env.JWT_SECRET,
        value: res?.data.token,
        expires: JWT_EXPIRES,
        httpOnly: true,
        maxAge: 90,
      });
      cookies().delete(process.env.SIGN_UP_EMAIL);
      return {
        status: "success",
        message: `Welcome to pizza passion`,
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response.data.message || "Server error!",
      errors: {},
    };
  }
}

export async function login(payload) {
  try {
    const response = await axios({
      method: "POST",
      baseURL: process.env.API_BASE_URL,
      url: "/auth/login",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      cookies().set({
        name: process.env.JWT_SECRET,
        value: response.data.token,
        expires: JWT_EXPIRES,
        httpOnly: true,
      });
      return {
        status: "success",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response.data.message || "Server error!",
      errors: {},
    };
  }
}

export async function resendEmailVerifyCode() {
  const email = await cookies().get(process.env.SIGN_UP_EMAIL)?.value;

  if (!email) {
    return {
      status: "fail",
      message: "Email has been deleted. Signup again",
    };
  } else {
    try {
      const response = await axios({
        method: "POST",
        baseURL: process.env.API_BASE_URL,
        url: "/auth/requestVerifyEmail",
        data: { email: email },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        await cookies().set({
          name: process.env.SIGN_UP_EMAIL,
          value: response.data.email,
          expires: SIGN_UP_EMAIL_EXPIRES,
          httpOnly: true,
        });
        return response.data;
      }
    } catch (err) {
      return {
        status: "fail",
        message:
          err.response.data.message || "Something went wrong from server!",
      };
    }
  }
}

export async function logout() {
  await cookies().delete(process.env.JWT_SECRET);
  redirect("/");
}

export async function forgetPassword(payload) {
  try {
    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/forgetPassword`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      await cookies().set({
        name: process.env.FORGET_EMAIL,
        value: payload.email,
        expires: FORGET_EMAIL_EXPIRES,
        httpOnly: true,
      });
      return {
        status: "success",
        message: res.data.message,
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data.message || "Server error!",
    };
  }
}

export async function recoverPassword(payload) {
  try {
    const res = await axios.patch(
      `${process.env.API_BASE_URL}/auth/recoverPassword/${payload.recoverId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      await cookies().delete(process.env.FORGET_EMAIL);
      return {
        status: "success",
        message: res.data.message,
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data?.message || "Server error!",
    };
  }
}
