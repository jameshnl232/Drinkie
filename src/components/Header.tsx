import React from "react";
import { DrinkieLogo } from "./DrinkieLogo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="relative  flex justify-center pt-5 md:pt-10 bg-pink-300">
      <DrinkieLogo className="  h-10 w-full cursor-pointer text-sky-400 md:h-14 lg:h-16" />
    </header>
  );
}
