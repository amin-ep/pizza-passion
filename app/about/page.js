import Image from "next/image";
import image1 from "@/public/images/about-1.jpg";
import image2 from "@/public/images/about-2.jpg";
import image3 from "@/public/images/about-3.jpg";
import image4 from "@/public/images/about-4.jpg";
import Link from "next/link";
import AnimatedParagraph from "../_components/AnimatedParagraph";

export const metadata = {
  title: "About",
};

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-5 lg:gap-x-24 lg:gap-y-32 text-lg items-center px-4 lg:px-0">
      <div className="lg:col-span-3 relative text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          Welcome to Pizza Passion
        </h1>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Welcome to Pizza Passion, your one-stop solution for satisfying your pizza cravings from the comfort of your home. At Pizza Passion, we believe that good food should be convenient, delicious, and made with the finest ingredients. Whether you're in the mood for classic flavors or something adventurous, we've got the perfect slice for you!" />
        </div>
      </div>

      <div className="lg:col-span-2 relative">
        <Image
          placeholder="blur"
          className="object-cover w-full h-auto"
          src={image1}
          alt="Pizzas on each other"
        />
      </div>

      <div className="lg:col-span-2 relative">
        <Image
          placeholder="blur"
          className="object-cover w-full h-auto"
          src={image2}
          alt="Chef is making pizza"
        />
      </div>

      <div className="lg:col-span-3 relative text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          How It Works
        </h1>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Ordering your favorite pizza is just a few clicks away! Choose from our range of pizzas, add sides and drinks, and customize your order to suit your taste. Once you've placed your order, sit back and relax – we'll deliver your pizza hot and fresh right to your door. And for your convenience, you can pay upon delivery." />
        </div>
      </div>

      <div className="lg:col-span-3 relative text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          Our Story
        </h1>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="Pizza Passion started with a simple idea: to make delicious, high-quality pizza accessible to everyone without the hassle. Since our founding, we've focused on delivering an exceptional pizza experience, combining fresh ingredients, unique recipes, and a passion for flavor. Join us on this journey and discover your love for pizza all over again!" />
        </div>
      </div>

      <div className="lg:col-span-2 relative">
        <Image
          className="object-cover w-full h-auto"
          placeholder="blur"
          src={image3}
          alt="Pizzas on each other"
        />
      </div>

      <div className="lg:col-span-2 relative">
        <Image
          className="object-cover w-full h-auto"
          placeholder="blur"
          src={image4}
          alt="Family is eating pizza"
        />
      </div>

      <div className="lg:col-span-3 relative text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 text-accent-400 font-medium">
          Our Promise
        </h1>
        <div className="space-y-6 lg:space-y-8">
          <AnimatedParagraph text="We are committed to bringing you the best pizza experience with every order. From the quality of our ingredients to our fast and reliable delivery, everything we do is focused on your satisfaction. We're here to make your pizza moments memorable." />
          <div>
            <Link
              href="/menu"
              className="inline-block mt-4 bg-accent-500 px-6 py-4 text-primary-800 text-base lg:text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Order Delicious Pizzas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
