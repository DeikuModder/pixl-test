"use client";

import { Typewriter } from "react-simple-typewriter";

const TypewriterWrap = () => {
  return (
    <Typewriter
      words={["products", "customers", "place to buy"]}
      loop={true}
      cursor
      cursorStyle="|"
      typeSpeed={80}
      deleteSpeed={60}
      delaySpeed={1500}
    />
  );
};

export default TypewriterWrap;
