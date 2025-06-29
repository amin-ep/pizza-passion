import image1 from "@/public/images/about-1.jpg";
import image2 from "@/public/images/about-2.jpg";
import image3 from "@/public/images/about-3.jpg";
import image4 from "@/public/images/about-4.jpg";
import Image from "next/image";
import Link from "next/link";

import AboutImageContainer from "@/app/_components/motions/AboutImageContainer";
import AnimatedHeading from "@/app/_components/motions/AnimatedHeading";
import AnimatedParagraph from "@/app/_components/motions/AnimatedParagraph";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 items-center gap-y-12 px-4 text-lg lg:grid-cols-5 lg:gap-x-24 lg:gap-y-32 lg:px-0">
      <div className="relative text-center lg:col-span-3 lg:text-left">
        <AnimatedHeading>Welcome to Pizza Passion</AnimatedHeading>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Welcome to Pizza Passion, your one-stop solution for satisfying your pizza cravings from the comfort of your home. At Pizza Passion, we believe that good food should be convenient, delicious, and made with the finest ingredients. Whether you're in the mood for classic flavors or something adventurous, we've got the perfect slice for you!" />
        </div>
      </div>

      <AboutImageContainer index={0}>
        <Image
          placeholder="blur"
          className="h-auto w-full object-cover"
          src={image1}
          alt="Pizzas on each other"
        />
      </AboutImageContainer>

      <AboutImageContainer index={1}>
        <Image
          placeholder="blur"
          className="h-auto w-full object-cover"
          src={image2}
          alt="Chef is making pizza"
        />
      </AboutImageContainer>

      <div className="relative text-center lg:col-span-3 lg:text-left">
        <AnimatedHeading>How It Works</AnimatedHeading>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Ordering your favorite pizza is just a few clicks away! Choose from our range of pizzas, add sides and drinks, and customize your order to suit your taste. Once you've placed your order, sit back and relax – we'll deliver your pizza hot and fresh right to your door. And for your convenience, you can pay upon delivery." />
        </div>
      </div>

      <div className="relative text-center lg:col-span-3 lg:text-left">
        <AnimatedHeading>Our Story</AnimatedHeading>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Pizza Passion started with a simple idea: to make delicious, high-quality pizza accessible to everyone without the hassle. Since our founding, we've focused on delivering an exceptional pizza experience, combining fresh ingredients, unique recipes, and a passion for flavor. Join us on this journey and discover your love for pizza all over again!" />
        </div>
      </div>

      <AboutImageContainer index={2}>
        <Image
          className="h-auto w-full object-cover"
          placeholder="blur"
          src={image3}
          alt="Pizzas on each other"
        />
      </AboutImageContainer>

      <AboutImageContainer index={3}>
        <Image
          className="h-auto w-full object-cover"
          placeholder="blur"
          src={image4}
          alt="Family is eating pizza"
        />
      </AboutImageContainer>

      <div className="relative text-center lg:col-span-3 lg:text-left">
        <AnimatedHeading>Our Promise</AnimatedHeading>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="We are committed to bringing you the best pizza experience with every order. From the quality of our ingredients to our fast and reliable delivery, everything we do is focused on your satisfaction. We're here to make your pizza moments memorable." />
          <div>
            <Link
              href="/menu"
              className="mt-4 inline-block bg-accent-500 px-6 py-4 text-base font-semibold text-primary-800 transition-all hover:bg-accent-600 lg:text-lg"
            >
              Order Delicious Pizzas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
