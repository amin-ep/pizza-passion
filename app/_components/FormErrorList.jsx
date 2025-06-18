import React from "react";

export default function FormErrorList({ errors }) {
  return (
    <ul className="mb-4 list-inside list-disc text-sm text-red-600">
      {errors.map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  );
}
