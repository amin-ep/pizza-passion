"use client";

import { ratePizzaById } from "@/actions/pizza-actions";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { toast } from "react-toastify";
import SpinnerMini from "./SpinnerMini";
import { motion } from "framer-motion";

function StarRating({
  maxRating = 5,
  pizzaId,
  ratings,
  currentUserId,
  isLoggedIn,
}) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);

  const [starsIsOpen, setStarsIsOpen] = useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (isLoggedIn && currentUserId) {
      const isRatedByCurrentUser = ratings.some(
        (el) => el.user === currentUserId,
      );
      setUserHasRated(isRatedByCurrentUser);

      if (userHasRated) {
        const userRate = ratings.find((rt) => rt.user === currentUserId).rate;
        setRating(userRate);
      }
    }
  }, [isLoggedIn, currentUserId, ratings, userHasRated]);

  async function ratePizza(rateNumber) {
    if (isLoggedIn) {
      startTransition(async () => {
        const res = await ratePizzaById(pizzaId, rateNumber);
        if (res.status === "success") {
          toast.success(res.message);
          setStarsIsOpen(false);
        } else {
          toast.error(res.message);
        }
      });
    } else {
      router.push("/access");
    }
  }

  return (
    <div className="absolute bottom-1 right-1 flex w-full items-center justify-end overflow-hidden">
      <motion.button
        onClick={() => setStarsIsOpen((state) => !state)}
        className="absolute bottom-1 right-1 flex aspect-square items-center justify-center rounded-sm bg-accent-500 p-1 hover:bg-accent-600"
        whileTap={{
          scale: 0.8,
        }}
        initial={{
          x: 30,
          opacity: 0,
        }}
        animate={{
          x: [-10, 0],
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
      >
        {isPending ? (
          <SpinnerMini />
        ) : starsIsOpen ? (
          <Image
            src="/icons/close-icon-primary.svg"
            alt="close"
            width={25}
            height={25}
          />
        ) : (
          <Image
            src="/icons/star-icon-primary.svg"
            alt="star"
            width={25}
            height={25}
          />
        )}
      </motion.button>
      <div
        className={clsx(
          "flex items-center gap-0 text-4xl transition-all",
          starsIsOpen ? "-translate-x-10" : "translate-x-56",
        )}
      >
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            onRate={() => ratePizza(index + 1)}
            full={tempRating ? tempRating >= index + 1 : rating >= index + 1}
            onHoverIn={() => {
              setTempRating(index + 1);
            }}
            onHoverOut={() => {
              setTempRating(0);
            }}
            disabled={userHasRated}
          />
        ))}
      </div>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, disabled }) {
  return (
    <button
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      className="text- px-1 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      <HiOutlineStar color="#B78343" fill={full ? "#B78343" : "transparent"} />
    </button>
  );
}

export default StarRating;
