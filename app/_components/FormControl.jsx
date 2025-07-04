export default function FormControl({
  children,
  classNames,
  variation = "col",
  id,
  label,
}) {
  return (
    <div className={`flex flex-${variation} ${classNames} gap-2`}>
      {label && (
        <label className="w-fit text-lg" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
