import React from "react";

export default function FormErrorList({ errors }) {
  return (
    <ul className="my-4 flex list-inside list-disc flex-col gap-1 text-sm text-red-600">
      {errors.map((err, idx) => (
        <li key={idx} className="text-xs sm:text-sm">
          {err}
        </li>
      ))}
    </ul>
  );
}
