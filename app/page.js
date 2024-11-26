import Image from "next/image";
import bg from "@/public/images/bg.jpg";
import Link from "next/link";

function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        quality={100}
        fill
        placeholder="blur"
        alt="Pizza"
        className="object-cover object-top"
      />
      <div className="text-center relative">
        <h1 className="text-4xl sm:text-6xl md:text-8xl text-primary-50 mb-10 tracking-tighter font-normal">
          Welcome To Pizza Passion
        </h1>
        <Link
          href="/menu"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Start Ordering
        </Link>
      </div>
    </main>
  );
}

export default Page;
