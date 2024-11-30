"use client";
import { motion } from "framer-motion";
import AnimatedParagraph from "./AnimatedParagraph";

function MenuDescription() {
  const description =
    "Pizza Passion menu brings authentic Italian flavors to your table. Savor classics like Margherita with mozzarella and basil, or try our bold Pepperoni Passion. Our Veggie Delight and BBQ Chicken Supreme offer fresh and flavorful twists. Pair your pizza with garlic bread or a crisp salad, and finish with a dessert like chocolate lava cake. Every dish is crafted with quality ingredients for a memorable meal.";
  return (
    <>
      <motion.h1
        className="text-3xl sm:text-4xl mb-5 text-accent-400 font-medium whitespace-nowrap overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{
          duration: 4,
        }}
      >
        Our Menu
      </motion.h1>

      <AnimatedParagraph text={description} />
    </>
  );
}

export default MenuDescription;
