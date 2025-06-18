"use client";
import { motion } from "framer-motion";
import AnimatedParagraph from "./motions/AnimatedParagraph";
import AnimatedHeading from "./motions/AnimatedHeading";

function MenuDescription() {
  const description =
    "Pizza Passion menu brings authentic Italian flavors to your table. Savor classics like Margherita with mozzarella and basil, or try our bold Pepperoni Passion. Our Veggie Delight and BBQ Chicken Supreme offer fresh and flavorful twists. Pair your pizza with garlic bread or a crisp salad, and finish with a dessert like chocolate lava cake. Every dish is crafted with quality ingredients for a memorable meal.";
  return (
    <>
      <AnimatedHeading>Our Menu</AnimatedHeading>

      <AnimatedParagraph text={description} />
    </>
  );
}

export default MenuDescription;
