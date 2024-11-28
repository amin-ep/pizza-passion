"use client";

import { useEffect, useState } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { ratePizzaById } from "../_lib/actions";
import { useAuth } from "../_contexts/AuthContext";
import { useRouter } from "next/navigation";

function StarRating({ maxRating = 5, pizzaId, pizzaRatings }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [userHasRated, setUserHasRated] = useState(false);
  const router = useRouter();

  const { userData, status, isLoggedIn } = useAuth();

  useEffect(() => {
    const userDataInRatings = pizzaRatings.find(
      (el) => el.user === userData._id
    );
    if (status === "idle") {
      if (userDataInRatings) {
        setUserHasRated(true);
      } else {
        setUserHasRated(false);
      }
    }

    if (userHasRated) {
      setRating(userDataInRatings?.rate);
    }
  }, [userData, status, pizzaRatings, userHasRated]);

  const handleRate = async (rating) => {
    if (isLoggedIn) {
      setRating(rating);
      await ratePizzaById(pizzaId, rating);
    } else {
      router.push("/access");
    }
  };

  return (
    <div className="flex items-center gap-0 text-4xl">
      {Array.from({ length: maxRating }).map((_, index) => (
        <Star
          key={index}
          onRate={() => handleRate(index + 1)}
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
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, disabled }) {
  return (
    <button
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      className="px-1 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      <HiOutlineStar color="gold" fill={full ? "gold" : "transparent"} />
    </button>
  );
}

export default StarRating;
