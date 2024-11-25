import Image from "next/image";
import Link from "next/link";
// import logo from "@/public/images/pizza-icon.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src="/images/pizza-icon.png"
        alt="Pizza Passion Logo"
        width={60}
        height={60}
        quality={100}
      />
      {/* <Image src={logo} alt="Pizza Passion Logo" /> */}
      <span className="font-semibold text-xl text-primary-100">
        Pizza Passion
      </span>
    </Link>
  );
}

export default Logo;
