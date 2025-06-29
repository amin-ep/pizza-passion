"use server";

import { getMe } from "@/app/_services/user-api";
import { CHANGE_EMAIL_EXPIRES } from "@/app/_utils/constants";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfile(data) {
  try {
    const token = await cookies().get(process.env.JWT_SECRET).value;
    const res = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateMe`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      revalidateTag("me");
      return {
        status: "success",
        message: "Updated successfully",
      };
    }
  } catch (err) {
    return {
      status: "error",
      message: err?.response?.data.message || "Server error!",
    };
  }
}

export async function requestChangeEmail(payload) {
  try {
    const token = await cookies().get(process.env.JWT_SECRET)?.value;

    if (!token) {
      return {
        status: "error",
        message: "You are not logged in",
      };
    }

    const res = await axios.post(
      `${process.env.API_BASE_URL}/user/updateEmail`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      await cookies().set({
        name: process.env.CHANGE_EMAIL,
        value: res.data.email,
        expires: CHANGE_EMAIL_EXPIRES,
        httpOnly: true,
      });
      return {
        status: "success",
        message: res?.data.message,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: "error",
      message: err?.response?.data.message || "Server error!",
    };
  }
}

export async function resendChangeEmailCode() {
  const token = await cookies().get(process.env.JWT_SECRET)?.value;
  const candidateEmail = await cookies().get(process.env.CHANGE_EMAIL)?.value;
  const currentUser = await getMe();

  if (!token) {
    return {
      status: "error",
      message: "You are not logged in",
    };
  }

  if (!candidateEmail || !currentUser.email) {
    return {
      status: "fail",
      message: "Email has been deleted. Try again",
    };
  } else {
    try {
      const response = await axios({
        method: "POST",
        baseURL: process.env.API_BASE_URL,
        url: "/user/updateEmailResend",
        data: { candidateEmail: candidateEmail, email: currentUser.email },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        await cookies().set({
          name: process.env.CHANGE_EMAIL,
          value: response.data.email,
          expires: CHANGE_EMAIL_EXPIRES,
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

export async function verifyChangeEmail(payload) {
  try {
    const token = await cookies().get(process.env.JWT_SECRET)?.value;
    if (!token) {
      return {
        status: "error",
        message: "You are not logged in",
      };
    }
    const res = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateEmailVerify`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      await cookies().delete(process.env.CHANGE_EMAIL);
      revalidateTag("me");
      return {
        status: "success",
        message: "Your email updated successfully!",
      };
    }
  } catch (err) {
    return {
      status: "fail",
      message: err.response.data.message || "Something went wrong from server!",
    };
  }
}
