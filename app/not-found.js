import Link from "next/link";

function Notfound() {
  return (
    <main className="text-center space-y-6">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 text-lg px-6 py-3"
      >
        Go back home
      </Link>
    </main>
  );
}

export default Notfound;
