import Image from "next/image";
import Link from "next/link";

export default async function AccountLink() {
  return (
    <Link href="/account">
      <Image
        src="/icons/user-icon-accent.svg"
        alt="user"
        width={35}
        height={35}
        className="w-7 sm:w-8 md:w-10"
      />
    </Link>
  );
}
