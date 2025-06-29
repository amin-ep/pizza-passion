export function convertErrors(errors) {
  const errorArr = Object.values(errors).map((err) => err.message);
  return errorArr || [];
}
