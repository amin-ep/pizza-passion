import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/menu" className="flex items-center gap-4">
      <div className="relative aspect-square w-8 sm:w-14 md:w-16">
        <Image
          src="/icons/pizza-icon.svg"
          alt="Pizza Passion Logo"
          fill
          className="object-cover"
        />
      </div>
      <span className="text-base font-semibold uppercase text-accent-600 md:text-lg lg:text-xl xl:text-2xl">
        Pizza Passion
      </span>
    </Link>
  );
}

export default Logo;
