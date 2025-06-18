"use client";

import { resendEmailVerifyCode } from "@/actions/auth-actions";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

export default function VerifyTimer({ email }) {
  const [time, setTime] = useState(60);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (time === 0) return;
    const interval = setInterval(() => {
      setTime((state) => state - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const resendCode = () => {
    startTransition(async () => {
      const res = await resendEmailVerifyCode();
      if (res.status === "success") {
        setTime(60);
        toast.success(`Another verification code sent to ${email}`);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="text-sm font-bold text-primary-900">
      {time > 0 ? (
        <span>You can request a new code in {time} seconds</span>
      ) : (
        <button
          disabled={isPending}
          onClick={resendCode}
          className="hover:underline focus:outline-none disabled:cursor-not-allowed disabled:text-primary-700"
        >
          Click here to resend verification code
        </button>
      )}
    </div>
  );
}
