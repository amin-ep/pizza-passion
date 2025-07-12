import FormControlLabel from "./FormControlLabel";

export default function FormControl({
  children,
  classNames,
  variation = "col",
  id,
  label,
  delay = 0,
}) {
  return (
    <div className={`flex flex-${variation} ${classNames} gap-2`}>
      {label && (
        <FormControlLabel delay={delay} className="w-fit text-lg" htmlFor={id}>
          {label}
        </FormControlLabel>
      )}
      {children}
    </div>
  );
}
