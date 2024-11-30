import bg from "@/public/images/bg.jpg";
import Image from "next/image";
import HomepageSection from "./_components/HomepageSection";
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
      <HomepageSection />
    </main>
  );
}

export default Page;
