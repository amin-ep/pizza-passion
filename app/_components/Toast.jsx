"use client";

import { ToastContainer, cssTransition } from "react-toastify";

export default function Toast() {
  const contextClasses = {
    success: "bg-green-950 border-green-900",
    error: "bg-red-950 border-red-900",
    warning: "bg-yellow-950 border-yellow-900",
    info: "bg-blue-950 border-blue-900",
  };

  const transition = cssTransition({
    enter: "toast-enter",
    exit: "toast-exit",
    collapse: false,
  });
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      closeButton={false}
      limit={3}
      draggable={false}
      pauseOnHover={true}
      transition={transition}
      toastClassName={(context) =>
        contextClasses[context?.type || "default"] +
        " flex items-center justify-center rounded-xl p-3 border my-2 text-sm"
      }
      hideProgressBar
      closeOnClick
    />
  );
}
