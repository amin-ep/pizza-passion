function SpinnerMini({ theme = "dark" }) {
  return (
    <div
      className={`spinner-mini ${
        theme === "dark" ? "border-primary-800" : "border-primary-200"
      } border-r-transparent`}
    ></div>
  );
}

export default SpinnerMini;
