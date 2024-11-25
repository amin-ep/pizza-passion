"use client";

import { GiFullPizza } from "react-icons/gi";
import LinkButton from "./LinkButton";
import { useRouter } from "next/navigation";

function AccessSection() {
  const router = useRouter();
  return (
    <section className="hidden md:flex text-left flex-col justify-center gap-12 text-dark-navy">
      <h1 className="font-semibold text-7xl flex items-center">
        <GiFullPizza />
        Pizza Passion
      </h1>
      <p className="text-3xl">
        Stay at Home, Order At home, Pay at Door!
        <br />
        <strong>Easy! Just Click and order!</strong>
      </p>
      <div>
        <LinkButton onClick={() => router.back()}>Back To Home</LinkButton>
      </div>
    </section>
  );
}

export default AccessSection;
