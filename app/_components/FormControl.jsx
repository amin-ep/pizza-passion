"use client";

export default function FormControl({
  children,
  classNames,
  variation = "col",
  id,
  label,
  error,
}) {
  return (
    <div className={`flex flex-${variation} ${classNames} gap-2`}>
      {label && (
        <label className="text-lg" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
