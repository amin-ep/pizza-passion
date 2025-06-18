import bg from "@/public/images/high-angle-shot-pizza-pieces-wooden-roller-wooden.jpg";
import Image from "next/image";
import WelcomeSection from "./_components/WelcomeSection/WelcomeSection";

function HomePage() {
  return (
    <>
      <Image
        src={bg}
        quality={100}
        fill
        placeholder="blur"
        alt="Pizza"
        className="object-cover object-left sm:object-center"
      />
      <WelcomeSection />
    </>
  );
}

export default HomePage;
