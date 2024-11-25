import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/images/pizza-icon.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <div className="relative w-10 aspect-square sm:w-14 md:w-16">
        <Image
          src="/images/pizza-icon.png"
          alt="Pizza Passion Logo"
          fill
          quality={100}
          className="object-cover"
        />
      </div>
      <span className="font-semibold text-lg sm:text-xl md:text-2xl uppercase text-accent-500">
        Pizza Passion
      </span>
    </Link>
  );
}

export default Logo;
