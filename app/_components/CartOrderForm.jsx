"use client";

import FormControl from "./FormControl";

import { motion } from "framer-motion";

export default function CartOrderForm() {
  return (
    <motion.div
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="h-fit rounded-sm bg-primary-900 p-2 md:p-4"
    >
      <form>
        <div>
          <span>Address</span>
          <FormControl id="street" label="Street">
            <input type="text" className="input" name="" id="street" />
          </FormControl>
          <FormControl id="postal-code" label="Postal Code">
            <input type="number" className="input" name="" id="postal-code" />
          </FormControl>
          <FormControl id="text" label="Address Text">
            <textarea className="input" name="" id="text" />
          </FormControl>
        </div>
        <FormControl id="phone" label="Phone number">
          <input type="tel" className="input" name="" id="phone" />
        </FormControl>
        <FormControl id="description" label="Description">
          <textarea className="input" name="" id="description" />
        </FormControl>
      </form>
    </motion.div>
  );
}
